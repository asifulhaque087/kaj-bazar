import {
  Exchanges,
  FanoutListener,
  handleAsync,
  type ReviewSeeded,
  type ReviewSeededQueues,
  type Seller_Received_Review_Event,
  type SellerReceivedReviewQueues,
} from "@fvoid/shared-lib";
import { db } from "@src/db";
import { OrdersTable } from "@src/schemas";
import type { ConsumeMessage } from "amqplib";
import { eq } from "drizzle-orm";

export class ReviewSeededListener extends FanoutListener<ReviewSeeded> {
  exchangeName: Exchanges.ReviewSeeded = Exchanges.ReviewSeeded;

  queueName: ReviewSeededQueues = "review-seeded-order-queue";

  async onMessage(data: ReviewSeeded["data"], message: ConsumeMessage) {
    const { reviews } = data;

    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];

      if (!review) continue;

      const { orderId, ratings, comment, buyerIsSender } = review;

      const reviewObject = {
        rating: ratings,
        review: comment,
        // receivedAt: reivewGivenAt.toISOString(),
        // receivedAt: new Date(reivewGivenAt).toISOString(),
        // receivedAt: reivewGivenAt,
      };

      const [order] = await handleAsync(
        db
          .update(OrdersTable)
          .set({
            ...(buyerIsSender
              ? { sellerReceivedReview: reviewObject }
              : { buyerReceivedReview: reviewObject }),
          })
          .where(eq(OrdersTable.id, orderId))
          .returning()
      );
    }

    this.channel.ack(message);
  }
}
