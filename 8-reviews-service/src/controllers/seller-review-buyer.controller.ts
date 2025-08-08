// ** Third Party Imports
import type { Request, Response } from "express";

// ** Local Imports
import { handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import type { SellerReviewBuyerInput } from "@src/validations/review.validation";
import { ReviewsTable } from "@src/drizzle/schemas";

const sellerReviewBuyer = async (req: Request, res: Response) => {
  const reviewData = req.body as SellerReviewBuyerInput;

  const [review] = await handleAsync(
    db.insert(ReviewsTable).values(reviewData).returning()
  );

  return res.json(review);
};

export default sellerReviewBuyer;
