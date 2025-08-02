import { handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { SellersTable } from "@src/drizzle/schemas";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

const getSellerByName = async (req: Request, res: Response) => {
  const { username } = req.params;

  const [seller] = await handleAsync(
    db.select().from(SellersTable).where(eq(SellersTable.username, username!))
  );

  return res.json(seller);
};

export default getSellerByName;
