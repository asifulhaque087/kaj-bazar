// ** Third Party Imports
import type { Request, Response } from "express";
import { eq } from "drizzle-orm";
import {
  BadRequestError,
  catchError,
  ConnectionError,
} from "@fvoid/shared-lib";

// ** Local Imports
import { db } from "@src/db";
import { ReviewsTable } from "@src/schemas";

const getGigReviews = async (req: Request, res: Response) => {
  const { gigId } = req.params;

  if (!gigId) throw new BadRequestError("Gig id not found");

  const [reviewErr, reviews] = await catchError(
    db.query.ReviewsTable.findMany({
      where: eq(ReviewsTable.gigId, gigId),
    })
  );

  if (reviewErr) throw new ConnectionError("Error fetching reviews from DB!");

  return res.json(reviews);
};

export default getGigReviews;
