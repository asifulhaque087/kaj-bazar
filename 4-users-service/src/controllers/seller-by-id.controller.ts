import { handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { SellersTable } from "@src/drizzle/schemas";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

const getSellerById = async (req: Request, res: Response) => {
  const { sellerId } = req.params;

  // const [seller] = await handleAsync(
  //   db.select().from(SellersTable).where(eq(SellersTable.id, sellerId!))
  // );

  const seller = await handleAsync(
    db.query.SellersTable.findFirst({
      where: eq(SellersTable.id, sellerId!),
      with: {
        languages: true,
        skills: true,
        experience: true,
        education: true,
        socialLinks: true,
        certificates: true,
      },
    })
  );

  return res.json(seller);
};

export default getSellerById;
