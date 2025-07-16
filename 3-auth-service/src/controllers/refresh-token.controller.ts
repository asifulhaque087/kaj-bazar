// ** Third Party Imports

import {
  BadRequestError,
  handleAsync,
  NotAuthorizedError,
} from "@fvoid/shared-lib";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

// ** Local Imports

import { config } from "@src/config";
import { db } from "@src/drizzle/db";
import { AuthTable } from "@src/drizzle/schema";

const refreshToken = async (req: Request, res: Response) => {
  // get current user email and find user
  const user = req.user;

  if (!user) throw new NotAuthorizedError();

  const isUser = await handleAsync(
    db.query.AuthTable.findFirst({
      where: eq(AuthTable.email, user.email),
    })
  );

  if (!isUser) throw new BadRequestError("Invalid token");

  // generate jwt
  const payload = {
    id: isUser?.id,
    email: isUser.email,
    username: isUser.username,
    exp: Math.floor(Date.now() / 1000) + 24 * 7 * 3600, // This will set the expiry to 7 days from now
  };

  const userJWT = jwt.sign(payload, config.JWT_TOKEN);

  // return response
  return res.json({ message: "Refresh token", user: isUser, token: userJWT });
};

export default refreshToken;
