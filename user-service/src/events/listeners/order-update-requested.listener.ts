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
import { SellersTable } from "@src/schemas";
import { eq } from "drizzle-orm";

// ** --- types ---

interface Details {
  totalOngoingOrders: number;
  totalCompletedOrders: number;
}

export class OrderUpdateRequestedListener extends Listener<OrderUpdateRequested> {
  exchangeName: Exchanges.OrderUpdateRequested = Exchanges.OrderUpdateRequested;
  queueName: Queues.OrderUpdateRequested = Queues.OrderUpdateRequested;
  routingKey: RoutingKeys.OrderUpdateRequested =
    RoutingKeys.OrderUpdateRequested;

  async onMessage(data: OrderUpdateRequested["data"], message: ConsumeMessage) {
    const { orders } = data;

    const sellerOngoingOrdersMap = new Map<string, Details>();

    const theSeller = orders[0]?.sellerId;

    const pOrderL = orders.filter(
      (order) => order.sellerId === theSeller && order.status === "progress"
    ).length;

    const cOrderL = orders.filter(
      (order) => order.sellerId === theSeller && order.status === "complete"
    ).length;

    orders.forEach((order) => {
      const sellerOrderDetails = sellerOngoingOrdersMap.get(order.sellerId) || {
        totalCompletedOrders: 0,
        totalOngoingOrders: 0,
      };

      // console.log(
      //   "############## hola ",
      //   sellerOngoingOrdersMap,
      //   sellerOrderDetails
      // );

      if (order.status === "progress") {
        sellerOrderDetails.totalOngoingOrders += 1;
      }
      if (order.status === "complete") {
        sellerOrderDetails.totalCompletedOrders += 1;
      }

      sellerOngoingOrdersMap.set(order.sellerId, sellerOrderDetails);
    });

    console.log("############################ ", theSeller, pOrderL, cOrderL);
    console.log("!!!!!!!!!!!!!!!!!!!!  map ", sellerOngoingOrdersMap);

    // console.log("################# orders map ", sellerOngoingOrdersMap);

    // finally update the seller table
    for (const [sellerId, orderData] of sellerOngoingOrdersMap.entries()) {
      await catchError(
        db
          .update(SellersTable)
          .set({
            ongoingJobs: orderData.totalOngoingOrders,
            completedJobs: orderData.totalCompletedOrders,
          })
          .where(eq(SellersTable.id, sellerId))
      );
    }

    this.channel.ack(message);
  }
}
