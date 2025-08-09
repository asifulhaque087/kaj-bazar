import {
  Exchanges,
  FanoutListener,
  handleAsync,
  type Buyer_Received_Review_Event,
  type BuyerReceivedReviewQueues,
} from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { OrdersTable } from "@src/drizzle/schemas";
import type { ConsumeMessage } from "amqplib";
import { eq } from "drizzle-orm";

export class BuyerReceivedReviewListener extends FanoutListener<Buyer_Received_Review_Event> {
  exchangeName: Exchanges.Buyer_Received_Review =
    Exchanges.Buyer_Received_Review;
  queueName: BuyerReceivedReviewQueues = "buyer-received-review-queue-order";

  async onMessage(
    data: Buyer_Received_Review_Event["data"],
    message: ConsumeMessage
  ) {
    const { orderId, ratings, comment, reivewGivenAt } = data;

    const reviewObject = {
      rating: ratings,
      review: comment,
      receivedAt: new Date(reivewGivenAt).toISOString(),
    };

    await handleAsync(
      db
        .update(OrdersTable)
        .set({
          buyerReceivedReview: reviewObject,
        })
        .where(eq(OrdersTable.id, orderId))
    );

    this.channel.ack(message);
  }
}
