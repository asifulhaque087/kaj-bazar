import {
  handleAsync,
  NotAuthorizedError,
  NotFoundError,
} from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { SellersTable } from "@src/drizzle/schemas";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

const getCurrentSeller = async (req: Request, res: Response) => {
  // get current user email and find user
  const user = req.user!;

  if (!user) throw new NotAuthorizedError();

  const seller = await db.query.SellersTable.findFirst({
    where: (sellersTable, { eq }) => eq(sellersTable.email, user.email),
    with: {
      languages: true,
      skills: true,
      experience: true,
      education: true,
      socialLinks: true,
      certificates: true,
    },
  });

  if (!seller) throw new NotFoundError();

  return res.json(seller);
};

export default getCurrentSeller;
