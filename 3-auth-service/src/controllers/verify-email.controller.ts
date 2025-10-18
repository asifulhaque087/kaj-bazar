// ** Third Party Imports
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

// ** Local Imports
import { BadRequestError, handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/db";
import { AuthTable } from "@src/schemas";
import type { VerifyEmailInput } from "@src/validations/verification.validation";

const verifyEmail = async (req: Request, res: Response) => {
  // Extract token
  const { token } = req.body as VerifyEmailInput;

  // Find user by token
  const isUser = await handleAsync(
    db
      .select()
      .from(AuthTable)
      .where(eq(AuthTable.emailVerificationToken, token))
      .limit(1)
      .then((res) => res[0])
  );

  if (!isUser) throw new BadRequestError("Invalid token");

  // Verify User Email
  await handleAsync(
    db
      .update(AuthTable)
      .set({ emailVerified: true, emailVerificationToken: null })
      .where(eq(AuthTable.id, isUser.id))
  );

  // Return Response
  return res.json({ message: "Account verified successfully" });
};

export default verifyEmail;
