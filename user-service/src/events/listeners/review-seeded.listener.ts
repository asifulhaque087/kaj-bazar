import {
  Exchanges,
  FanoutListener,
  handleAsync,
  NotFoundError,
  type ReviewSeeded,
  type ReviewSeededQueues,
} from "@fvoid/shared-lib";
import { db } from "@src/db";
import { BuyersTable, SellersTable } from "@src/schemas";
import type { ConsumeMessage } from "amqplib";
import { eq } from "drizzle-orm";

export class ReviewSeededListener extends FanoutListener<ReviewSeeded> {
  exchangeName: Exchanges.ReviewSeeded = Exchanges.ReviewSeeded;

  queueName: ReviewSeededQueues = "review-seeded-user-queue";

  async onMessage(data: ReviewSeeded["data"], message: ConsumeMessage) {
    const { reviews } = data;

    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];

      if (!review) continue;

      const { ratings: newRating, sellerId, buyerId, buyerIsSender } = review;

      if (buyerIsSender) continue;

      // const Table = buyerIsSender ? BuyersTable : SellersTable;
      // const id = buyerIsSender ? buyerId : sellerId;

      const Table = SellersTable;
      const id = sellerId;

      // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!! ", review);
      await updateEntityRatings(Table, id, newRating);
    }

    this.channel.ack(message);
  }
}

const updateEntityRatings = async (
  Table: typeof SellersTable,
  id: string,
  newRating: number
) => {
  // 1. Select the current entity record
  const [entity] = await db.select().from(Table).where(eq(Table.id, id));

  if (!entity) throw new NotFoundError();

  // 2. Calculate updated aggregates
  const updatedRatingsCount = (entity.ratingsCount ?? 0) + 1;
  const updatedRatingSum = (entity.ratingSum ?? 0) + newRating;

  // 3. Prepare the rating category update
  type RatingKeys = "one" | "two" | "three" | "four" | "five";
  const ratingKey: RatingKeys = ["one", "two", "three", "four", "five"][
    newRating - 1
  ]! as RatingKeys;

  const updatedRatingCategories = { ...entity.ratingCategories };
  updatedRatingCategories[ratingKey].count += 1;

  // 4. Perform the update
  await handleAsync(
    db
      .update(Table)
      .set({
        ratingCategories: updatedRatingCategories,
        ratingsCount: updatedRatingsCount,
        ratingSum: updatedRatingSum,
      })
      .where(eq(Table.id, id))
  );
};
