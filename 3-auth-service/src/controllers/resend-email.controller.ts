import { handleAsync, NotFoundError } from "@fvoid/shared-lib";
import { config } from "@src/config";
import { db } from "@src/drizzle/db";
import { AuthTable } from "@src/drizzle/schema";
import { SendEmailPublisher } from "@src/events/publishers/send-email-publisher";
import { mqWrapper } from "@src/rabbitmq-wrapper";
import type { ResendEmaiInput } from "@src/validations/verification.validation";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

import * as crypto from "node:crypto";

const resendEmail = async (req: Request, res: Response) => {
  // Extract Data
  const { email } = req.body as ResendEmaiInput;

  // Find the user by email
  const isUser = await handleAsync(
    db
      .select()
      .from(AuthTable)
      .where(eq(AuthTable.email, email))
      .limit(1)
      .then((res) => res[0])
  );

  if (!isUser) throw new NotFoundError();

  // Generate verfication link
  const randomCharacters = crypto.randomBytes(20).toString("hex");
  const verificationLink = `${config.CLIENT_URL}/confirm_email?v_token=${randomCharacters}`;

  // Update User
  await handleAsync(
    db
      .update(AuthTable)
      .set({ emailVerificationToken: randomCharacters })
      .where(eq(AuthTable.id, isUser.id))
  );

  // Publish Event
  new SendEmailPublisher(mqWrapper.channel).publish({
    receiverEmail: isUser.email!,
    verifyLink: verificationLink,
    template: "verifyEmail",
    username: isUser.username,
  });

  // Fetch updated user
  const updatedUser = await handleAsync(
    db
      .select()
      .from(AuthTable)
      .where(eq(AuthTable.email, email))
      .limit(1)
      .then((res) => res[0])
  );

  // Return Response
  return res.json({
    message: "Email verification sent",
    user: updatedUser,
  });
};

export default resendEmail;
