import {
  BadRequestError,
  catchError,
  ConnectionError,
} from "@fvoid/shared-lib";
import { db } from "@src/db";
import { GigsTable } from "@src/schemas";
import { and, eq } from "drizzle-orm";
import type { Request, Response } from "express";

const getSellerGigs = async (req: Request, res: Response) => {
  const { sellerId } = req.params;
  if (!sellerId) throw new BadRequestError("Id not found");

  let { activeGigs = "" } = req.query;

  const filters = [eq(GigsTable.sellerId, sellerId)];

  if (activeGigs) filters.push(eq(GigsTable.active, activeGigs === "true"));

  const conditions = and(...filters);

  const [gigError, gigs] = await catchError(
    db.query.GigsTable.findMany({
      where: conditions,
    })
  );

  if (gigError) throw new ConnectionError("Error Fetching Gigs From DB !");

  return res.json(gigs);

  // return res.json({ m: "I am from Get Seller Gigs" });
};

export default getSellerGigs;
