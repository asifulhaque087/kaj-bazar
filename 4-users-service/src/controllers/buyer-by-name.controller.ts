import { handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/db";
import { BuyersTable } from "@src/schemas";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

const getBuyerByName = async (req: Request, res: Response) => {
  const { username } = req.params;

  const [buyer] = await handleAsync(
    db.select().from(BuyersTable).where(eq(BuyersTable.username, username!))
  );

  return res.json(buyer);

  // return res.json({ m: "I am from get Buyer by name" });
};

export default getBuyerByName;
