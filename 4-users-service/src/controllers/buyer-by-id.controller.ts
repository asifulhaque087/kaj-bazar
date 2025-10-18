import { handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/db";
import { BuyersTable } from "@src/schemas";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

const getBuyerById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const [buyer] = await handleAsync(
    db.select().from(BuyersTable).where(eq(BuyersTable.id, id!))
  );

  return res.json(buyer);
};

export default getBuyerById;
