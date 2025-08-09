import {
  BadRequestError,
  Exchanges,
  FanoutListener,
  handleAsync,
  NotFoundError,
  type Seller_Received_Review_Event,
  type SellerReceivedReviewQueues,
} from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { SellersTable } from "@src/drizzle/schemas";
import type { ConsumeMessage } from "amqplib";
import { eq } from "drizzle-orm";

export class SellerReceivedReviewListener extends FanoutListener<Seller_Received_Review_Event> {
  exchangeName: Exchanges.Seller_Received_Review =
    Exchanges.Seller_Received_Review;

  queueName: SellerReceivedReviewQueues = "seller-received-review-queue-user";

  async onMessage(
    data: Seller_Received_Review_Event["data"],
    message: ConsumeMessage
  ) {
    // ** extract data
    const { ratings: newRating, sellerId } = data;

    // ** find the seller
    const [seller] = await db
      .select()
      .from(SellersTable)
      .where(eq(SellersTable.id, sellerId));

    if (!seller) throw new NotFoundError();

    const updatedRatingsCount = (seller.ratingsCount ?? 0) + 1;
    const updatedRatingSum = (seller.ratingSum ?? 0) + newRating;

    // Find the key for the rating (e.g., 'five', 'four')
    type RatingKeys = "one" | "two" | "three" | "four" | "five";

    const ratingKey: RatingKeys = ["one", "two", "three", "four", "five"][
      newRating - 1
    ]! as RatingKeys;

    const updatedRatingCategories = { ...seller.ratingCategories };
    // Update the count for the specific rating
    updatedRatingCategories[ratingKey].count += 1;

    await handleAsync(
      db
        .update(SellersTable)
        .set({
          ratingCategories: updatedRatingCategories,
          ratingsCount: updatedRatingsCount,
          ratingSum: updatedRatingSum,
        })
        .where(eq(SellersTable.id, sellerId))
    );

    this.channel.ack(message);
  }
}
