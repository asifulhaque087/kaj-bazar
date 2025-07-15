// ** Third Party Imports

import { BadRequestError } from "@fvoid/shared-lib";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

// ** Local Imports

import { config } from "@src/config";
import { db } from "@src/drizzle/db";
import { AuthTable } from "@src/drizzle/schema";

const verifyOtp = async (req: Request, res: Response) => {
  // Extract OTP
  const { otp } = req.params;

  if (!otp) throw new BadRequestError("OTP not found");

  // Find user by otp
  const isUser = await db
    .select()
    .from(AuthTable)
    .where(eq(AuthTable.otp, otp))
    .limit(1)
    .then((res) => res[0]);

  if (!isUser) throw new BadRequestError("Invalid OTP");

  // Check if OTP is expired
  if (isUser.otpExpiration && new Date() > new Date(isUser.otpExpiration)) {
    throw new BadRequestError("OTP has expired");
  }

  // Update otp
  await db
    .update(AuthTable)
    .set({
      otp: null, // Clear the OTP after successful verification
      otpExpiration: null, // Clear the expiry time
    })
    .where(eq(AuthTable.id, isUser.id));

  // Generate token
  const payload = {
    id: isUser?.id,
    email: isUser.email,
    username: isUser.username,
    exp: Math.floor(Date.now() / 1000) + 60 * 1, // testing
  };

  const userJWT = await jwt.sign(payload, config.JWT_TOKEN);

  // Return response
  res.json({
    message: "OTP verified successfully ",
    user: isUser,
    token: userJWT,
  });
};

export default verifyOtp;
