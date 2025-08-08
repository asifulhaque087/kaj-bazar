// ** Third Party Imports
import type { Request, Response } from "express";

// ** Local Imports
import { BadRequestError, handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import type { SellerReviewBuyerInput } from "@src/validations/review.validation";
import { ReviewsTable } from "@src/drizzle/schemas";
import { BuyerReceivedReviewPublisher } from "@src/events/publishers/buyer-received-review.publisher";
import { mqWrapper } from "@src/rabbitmq-wrapper";

const sellerReviewBuyer = async (req: Request, res: Response) => {
  const reviewData = req.body as SellerReviewBuyerInput;

  const [review] = await handleAsync(
    db.insert(ReviewsTable).values(reviewData).returning()
  );

  if (!review) throw new BadRequestError("review error");

  // ** Publish Event
  new BuyerReceivedReviewPublisher(mqWrapper.channel).publish(review);
  return res.json(review);
};

export default sellerReviewBuyer;
