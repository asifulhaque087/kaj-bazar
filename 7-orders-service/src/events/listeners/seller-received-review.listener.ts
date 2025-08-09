import {
  Exchanges,
  FanoutListener,
  handleAsync,
  type Seller_Received_Review_Event,
  type SellerReceivedReviewQueues,
} from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { OrdersTable } from "@src/drizzle/schemas";
import type { ConsumeMessage } from "amqplib";
import { eq } from "drizzle-orm";

export class SellerReceivedReviewListener extends FanoutListener<Seller_Received_Review_Event> {
  exchangeName: Exchanges.Seller_Received_Review =
    Exchanges.Seller_Received_Review;

  queueName: SellerReceivedReviewQueues = "seller-received-review-queue-order";

  async onMessage(
    data: Seller_Received_Review_Event["data"],
    message: ConsumeMessage
  ) {
    const { orderId, ratings, comment, reivewGivenAt } = data;

    const reviewObject = {
      rating: ratings,
      review: comment,
      // receivedAt: reivewGivenAt.toISOString(),
      receivedAt: new Date(reivewGivenAt).toISOString(),
      // receivedAt: reivewGivenAt,
    };

    await handleAsync(
      db
        .update(OrdersTable)
        .set({
          sellerReceivedReview: reviewObject,
        })
        .where(eq(OrdersTable.id, orderId))
    );

    this.channel.ack(message);
  }
}
