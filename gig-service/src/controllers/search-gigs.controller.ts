import { handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/db";
import { GigsTable } from "@src/schemas";
import { and, eq, gte, ilike, lte, or, count } from "drizzle-orm"; // Import 'or' and 'count'
import type { Request, Response } from "express";

const searchGigs = async (req: Request, res: Response) => {
  let { minPrice, maxPrice, deliveryTime, category, searchKey, page, limit } =
    req.query;

  const conditions = [];

  // Convert string query params to numbers where expected
  const parsedMinPrice =
    typeof minPrice === "string" ? parseInt(minPrice) : undefined;
  const parsedMaxPrice =
    typeof maxPrice === "string" ? parseInt(maxPrice) : undefined;

  // Pagination parameters
  const parsedPage = typeof page === "string" ? parseInt(page, 10) : 1;
  const parsedLimit = typeof limit === "string" ? parseInt(limit, 10) : 10;
  const offset = (parsedPage - 1) * parsedLimit;

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

  // Define the 'where' clause once
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // 1. Get total count of matching gigs (applying the same 'where' clause)
  const [totalCountResult] = await handleAsync(
    db
      .select({ count: count(GigsTable.id) })
      .from(GigsTable)
      .where(whereClause) // Apply the 'where' clause here
  );

  const totalCount = totalCountResult?.count || 0;

  // 2. Get paginated gigs (applying the same 'where' clause, then limit and offset)
  const gigs = await handleAsync(
    db
      .select()
      .from(GigsTable)
      .where(whereClause) // Apply the 'where' clause here
      .limit(parsedLimit)
      .offset(offset)
      // It's good practice to add an orderBy clause for consistent pagination
      // If no natural order, order by primary key (e.g., id)
      .orderBy(GigsTable.id)
  );

  return res.status(200).json({
    data: gigs,
    totalCount: Number(totalCount), // Ensure totalCount is a number
    currentPage: parsedPage,
    limit: parsedLimit,
  });
};

export default searchGigs;
