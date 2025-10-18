import {
  Exchanges,
  FanoutListener,
  handleAsync,
  NotFoundError,
  type Seller_Received_Review_Event,
  type SellerReceivedReviewQueues,
} from "@fvoid/shared-lib";
import { db } from "@src/db";
import { GigsTable } from "@src/schemas";
import type { ConsumeMessage } from "amqplib";
import { eq } from "drizzle-orm";

export class SellerReceivedReviewListener extends FanoutListener<Seller_Received_Review_Event> {
  exchangeName: Exchanges.Seller_Received_Review =
    Exchanges.Seller_Received_Review;
  queueName: SellerReceivedReviewQueues = "seller-received-review-queue-gig";

  async onMessage(
    data: Seller_Received_Review_Event["data"],
    message: ConsumeMessage
  ) {
    // ** extract data
    const { ratings: newRating, gigId } = data;

    // ** find the gig
    const [gig] = await db
      .select()
      .from(GigsTable)
      .where(eq(GigsTable.id, gigId));

    if (!gig) throw new NotFoundError();

    const updatedRatingsCount = (gig.ratingsCount ?? 0) + 1;
    const updatedRatingSum = (gig.ratingSum ?? 0) + newRating;

    // Find the key for the rating (e.g., 'five', 'four')
    type RatingKeys = "one" | "two" | "three" | "four" | "five";

    const ratingKey: RatingKeys = ["one", "two", "three", "four", "five"][
      newRating - 1
    ]! as RatingKeys;

    const updatedRatingCategories = { ...gig.ratingCategories };
    updatedRatingCategories[ratingKey].count += 1;

    await handleAsync(
      db
        .update(GigsTable)
        .set({
          ratingCategories: updatedRatingCategories,
          ratingsCount: updatedRatingsCount,
          ratingSum: updatedRatingSum,
        })
        .where(eq(GigsTable.id, gigId))
    );

    this.channel.ack(message);
  }
}
