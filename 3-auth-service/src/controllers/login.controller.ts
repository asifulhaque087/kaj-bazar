// ** Third Party Imports

import jwt from "jsonwebtoken";
import { BadRequestError, handleAsync } from "@fvoid/shared-lib";
import { eq, or } from "drizzle-orm";
import type { Request, Response } from "express";

// ** Local Imports

import { config } from "@src/config";
import { db } from "@src/drizzle/db";
import { AuthTable } from "@src/drizzle/schema";
import { verifyPassword } from "@src/utils/hashing.util";
import type { UserLoginInput } from "@src/validations/login-register.validation";

const login = async (req: Request, res: Response) => {
  // Extract the data
  const { username, email, password } = req.body as UserLoginInput;

  // Find isUser & throw error if !isUser
  const isUser = await handleAsync(
    db
      .select()
      .from(AuthTable)
      .where(or(eq(AuthTable.username, username), eq(AuthTable.email, email)))
      .limit(1)
      .then((res) => res[0])
  );

  if (!isUser) throw new BadRequestError("User not found");

  // Compare password
  const isPasswordValid = await verifyPassword(password, isUser.password);
  if (!isPasswordValid) throw new BadRequestError("Invalid credentials");

  // Generate jwt
  const payload = {
    id: isUser?.id,
    email: isUser.email,
    username: isUser.username,
    exp: Math.floor(Date.now() / 1000) + 24 * 7 * 3600, // This will set the expiry to 7 days from now
  };

  //   const userJWT = await sign(payload, config.JWT_TOKEN);
  const userJWT = jwt.sign(payload, config.JWT_TOKEN);

  // Return response

  return res.json({
    message: "User logged in successfully",
    user: isUser,
    token: userJWT,
  });
};

export default login;
