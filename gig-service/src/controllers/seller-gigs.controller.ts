import { handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/db";
import { GigsTable } from "@src/schemas";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

const getSellerGigs = async (req: Request, res: Response) => {
  const { sellerId } = req.params;

  const gigs = await handleAsync(
    db.select().from(GigsTable).where(eq(GigsTable.sellerId, sellerId!))
  );

  return res.json(gigs);

  // return res.json({ m: "I am from Get Seller Gigs" });
};

export default getSellerGigs;
