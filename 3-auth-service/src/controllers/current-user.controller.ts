// ** Third Party Imports

import { NotAuthorizedError, NotFoundError } from "@fvoid/shared-lib";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

// ** Local Imports

import { db } from "@src/drizzle/db";
import { AuthTable } from "@src/drizzle/schema";

const currentUser = async (req: Request, res: Response) => {
  // get current user email and find user
  const user = req.user;

  if (!user) throw new NotAuthorizedError();

  const isUser = await db.query.AuthTable.findFirst({
    where: eq(AuthTable.email, user.email),
  });

  if (!isUser) throw new NotFoundError();

  // return response
  res.json({ message: "Authenticated user", user });
};

export default currentUser;
