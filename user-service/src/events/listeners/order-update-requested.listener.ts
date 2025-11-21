import {
  catchError,
  Exchanges,
  Listener,
  Queues,
  RoutingKeys,
  type OrderUpdateRequested,
} from "@fvoid/shared-lib";
import type { ConsumeMessage } from "amqplib";
import { db } from "@src/db";
import { BuyersTable, SellersTable } from "@src/schemas";
import { eq } from "drizzle-orm";

// ** --- types ---

interface Details {
  totalOngoingOrders: number;
  totalCompletedOrders: number;
  totalCancelledOrders: number;
  totalEarnings: number;
}

export class OrderUpdateRequestedListener extends Listener<OrderUpdateRequested> {
  exchangeName: Exchanges.OrderUpdateRequested = Exchanges.OrderUpdateRequested;
  queueName: Queues.OrderUpdateRequested = Queues.OrderUpdateRequested;
  routingKey: RoutingKeys.OrderUpdateRequested =
    RoutingKeys.OrderUpdateRequested;

  async onMessage(data: OrderUpdateRequested["data"], message: ConsumeMessage) {
    const { orders } = data;

    const sellerOngoingOrdersMap = new Map<string, Details>();
    const buyerOngoingOrdersMap = new Map<string, Details>();

    orders.forEach((order) => {
      const sellerOrderDetails = sellerOngoingOrdersMap.get(order.sellerId) || {
        totalCompletedOrders: 0,
        totalOngoingOrders: 0,
        totalCancelledOrders: 0,
        totalEarnings: 0,
      };

      if (order.status === "progress") {
        sellerOrderDetails.totalOngoingOrders += 1;
      }
      if (order.status === "complete") {
        sellerOrderDetails.totalCompletedOrders += 1;
      }

      if (order.status === "incomplete") {
        sellerOrderDetails.totalCancelledOrders += 1;
      }

      sellerOrderDetails.totalEarnings += order.price;

      sellerOngoingOrdersMap.set(order.sellerId, sellerOrderDetails);

      // for buyer

      const buyerOrderDetails = buyerOngoingOrdersMap.get(order.buyerId) || {
        totalCompletedOrders: 0,
        totalOngoingOrders: 0,
        totalCancelledOrders: 0,
        totalEarnings: 0,
      };

      if (order.status === "progress") {
        buyerOrderDetails.totalOngoingOrders += 1;
      }
      if (order.status === "complete") {
        buyerOrderDetails.totalCompletedOrders += 1;
      }

      if (order.status === "incomplete") {
        buyerOrderDetails.totalCancelledOrders += 1;
      }

      buyerOrderDetails.totalEarnings += order.price;

      buyerOngoingOrdersMap.set(order.buyerId, buyerOrderDetails);
    });

    // finally update the seller table
    for (const [sellerId, orderData] of sellerOngoingOrdersMap.entries()) {
      await catchError(
        db
          .update(SellersTable)
          .set({
            ongoingJobs: orderData.totalOngoingOrders,
            completedJobs: orderData.totalCompletedOrders,
            cancelledJobs: orderData.totalCancelledOrders,
            totalEarnings: orderData.totalEarnings,
          })
          .where(eq(SellersTable.id, sellerId))
      );
    }

    for (const [buyerId, orderData] of buyerOngoingOrdersMap.entries()) {
      await catchError(
        db
          .update(BuyersTable)
          .set({
            ongoingJobs: orderData.totalOngoingOrders,
            completedJobs: orderData.totalCompletedOrders,
            cancelledJobs: orderData.totalCancelledOrders,
            totalEarnings: orderData.totalEarnings,
          })
          .where(eq(BuyersTable.id, buyerId))
      );
    }

    this.channel.ack(message);
  }
}
