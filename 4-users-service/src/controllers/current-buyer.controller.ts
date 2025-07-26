import {
  handleAsync,
  NotAuthorizedError,
  NotFoundError,
} from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { BuyersTable } from "@src/drizzle/schemas";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

const currentBuyer = async (req: Request, res: Response) => {
  // get current user email and find user
  const buyer = req.user;

  if (!buyer) throw new NotAuthorizedError();

  const isBuyer = await handleAsync(
    db.query.BuyersTable.findFirst({
      where: eq(BuyersTable.email, buyer.email),
    })
  );

  if (!isBuyer) throw new NotFoundError();

  // return response
  // return res.json({ message: "Authenticated user", user });
  // return res.json({ user: isUser });
  return res.json(isBuyer);
};

export default currentBuyer;
