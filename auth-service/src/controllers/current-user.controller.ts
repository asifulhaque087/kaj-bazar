// ** Third Party Imports

import {
  NotAuthorizedError,
  NotFoundError,
  handleAsync,
} from "@fvoid/shared-lib";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

// ** Local Imports

import { db } from "@src/db";
import { AuthTable } from "@src/schemas";

const currentUser = async (req: Request, res: Response) => {
  // get current user email and find user
  const user = req.user;

  if (!user) throw new NotAuthorizedError();

  const isUser = await handleAsync(
    db.query.AuthTable.findFirst({
      where: eq(AuthTable.email, user.email),
      columns: {
        password: false,
        passwordResetExpires: false,
        passwordResetToken: false,
        emailVerificationToken: false,
        otp: false,
        otpExpiration: false,
        browserName: false,
        deviceType: false,
      },
    })
  );

  if (!isUser) throw new NotFoundError();

  // return response
  // return res.json({ message: "Authenticated user", user });
  // return res.json({ user: isUser });
  return res.json(isUser);
};

export default currentUser;
