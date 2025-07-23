import { handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { GigsTable } from "@src/drizzle/schema";
import { and, eq, gte, ilike, lte, or } from "drizzle-orm"; // Import 'or'
import type { Request, Response } from "express";

const searchGigs = async (req: Request, res: Response) => {
  let { minPrice, maxPrice, deliveryTime, category, searchKey } = req.query;

  const conditions = [];

  // Convert string query params to numbers where expected
  const parsedMinPrice =
    typeof minPrice === "string" ? parseInt(minPrice) : undefined;
  const parsedMaxPrice =
    typeof maxPrice === "string" ? parseInt(maxPrice) : undefined;

  if (parsedMinPrice !== undefined && !isNaN(parsedMinPrice)) {
    conditions.push(gte(GigsTable.price, parsedMinPrice));
  }

  if (parsedMaxPrice !== undefined && !isNaN(parsedMaxPrice)) {
    conditions.push(lte(GigsTable.price, parsedMaxPrice));
  }

  if (typeof deliveryTime === "string" && deliveryTime.length > 0) {
    conditions.push(eq(GigsTable.expectedDelivery, deliveryTime as string));
  }

  if (typeof category === "string" && category.length > 0) {
    conditions.push(eq(GigsTable.category, category));
  }

  if (typeof searchKey === "string" && searchKey.length > 0) {
    conditions.push(
      or(
        ilike(GigsTable.category, `%${searchKey}%`),
        ilike(GigsTable.title, `%${searchKey}%`),
        ilike(GigsTable.description, `%${searchKey}%`)
      )
    );
  }

  const gigs = await handleAsync(
    db
      .select()
      .from(GigsTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
  );

  return res.status(200).json(gigs);
};

export default searchGigs;
