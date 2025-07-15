// ** Third Party Imports
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

// ** Local Imports
import { BadRequestError } from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { AuthTable } from "@src/drizzle/schema";
import type { VerifyEmailInput } from "@src/validations/verification.validation";

const verifyEmail = async (req: Request, res: Response) => {
  // Extract token
  const { token } = req.body as VerifyEmailInput;

  // Find user by token
  const isUser = await db
    .select()
    .from(AuthTable)
    .where(eq(AuthTable.emailVerificationToken, token))
    .limit(1)
    .then((res) => res[0]);

  if (!isUser) throw new BadRequestError("Invalid token");

  // Verify User Email
  await db
    .update(AuthTable)
    .set({ emailVerified: true, emailVerificationToken: null })
    .where(eq(AuthTable.id, isUser.id));

  // Return Response
  res.json({ message: "Account verify successfully" });
};

export default verifyEmail;
