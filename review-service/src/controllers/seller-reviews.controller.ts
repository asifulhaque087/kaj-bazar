// ** Third Party Imports
import type { Request, Response } from "express";
import { and, eq } from "drizzle-orm";
import {
  BadRequestError,
  catchError,
  ConnectionError,
} from "@fvoid/shared-lib";

// ** Local Imports
import { db } from "@src/db";
import { ReviewsTable } from "@src/schemas";

const getSellerReviews = async (req: Request, res: Response) => {
  const { sellerId } = req.params;

  if (!sellerId) throw new BadRequestError("Seller id not found");

  const [reviewErr, reviews] = await catchError(
    db.query.ReviewsTable.findMany({
      // where: eq(ReviewsTable.sellerId, sellerId),
      // where: eq(ReviewsTable.receiverId, sellerId),
      where: and(
        eq(ReviewsTable.sellerId, sellerId),
        eq(ReviewsTable.receiverId, sellerId)
      ),
    })
  );

  if (reviewErr) throw new ConnectionError("Error fetching reviews from DB!");

  return res.json(reviews);
};

export default getSellerReviews;
