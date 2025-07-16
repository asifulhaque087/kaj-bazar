// Third Party Imports

import { BadRequestError, handleAsync } from "@fvoid/shared-lib";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";
import * as crypto from "node:crypto";

// Local Imports

import { config } from "@src/config";
import { db } from "@src/drizzle/db";
import { AuthTable } from "@src/drizzle/schema";
import { SendEmailPublisher } from "@src/events/publishers/send-email-publisher";
import { mqWrapper } from "@src/rabbitmq-wrapper";
import type { ForgotPasswordInput } from "@src/validations/password.validation";

const forgotPassword = async (req: Request, res: Response) => {
  // extract data
  const { email } = req.body as ForgotPasswordInput;

  // find user by email
  const isUser = await handleAsync(
    db
      .select()
      .from(AuthTable)
      .where(eq(AuthTable.email, email))
      .limit(1)
      .then((res) => res[0])
  );

  if (!isUser) throw new BadRequestError("Invalid credentials");

  // generate new token and update user
  const randomCharacters = crypto.randomBytes(20).toString("hex");
  const date: Date = new Date();
  date.setHours(date.getHours() + 1);

  await handleAsync(
    db
      .update(AuthTable)
      .set({ passwordResetToken: randomCharacters, passwordResetExpires: date })
      .where(eq(AuthTable.id, isUser.id))
  );

  // send email
  const passwordResetLink = `${config.CLIENT_URL}/reset_password?token=${randomCharacters}`;

  new SendEmailPublisher(mqWrapper.channel).publish({
    receiverEmail: email!,
    resetLink: passwordResetLink,
    username: isUser.username,
    template: "forgotPassword",
  });

  // send response
  return res.json({ message: "Reset password link sent" });
};

export default forgotPassword;
