// ** Third Party Imports

import { BadRequestError, handleAsync } from "@fvoid/shared-lib";
import { and, eq, gt } from "drizzle-orm";
import type { Request, Response } from "express";

// ** Local Imports

import { db } from "@src/drizzle/db";
import { AuthTable } from "@src/drizzle/schema";
import { SendEmailPublisher } from "@src/events/publishers/send-email-publisher";
import { mqWrapper } from "@src/rabbitmq-wrapper";
import { hashPassword } from "@src/utils/hashing.util";
import type { ResetPasswordInput } from "@src/validations/password.validation";

const resetPassword = async (req: Request, res: Response) => {
  // extract data
  const { password } = req.body as ResetPasswordInput;
  const { token } = req.params;

  if (!token) throw new BadRequestError("Token not found");

  // Find user by token
  // const isUser = await db
  //   .select()
  //   .from(AuthTable)
  //   .where(eq(AuthTable.passwordResetToken, token))
  //   .limit(1)
  //   .then((res) => res[0]);

  const isUser = await handleAsync(
    db.query.AuthTable.findFirst({
      where: and(
        eq(AuthTable.passwordResetToken, token),
        gt(AuthTable.passwordResetExpires, new Date())
      ),
    })
  );

  if (!isUser) throw new BadRequestError("Invalid token");

  // hash the password
  const hashedPassword = await hashPassword(password);

  // update password
  await handleAsync(
    db
      .update(AuthTable)
      .set({
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      })
      .where(eq(AuthTable.id, isUser.id))
  );

  // send email
  new SendEmailPublisher(mqWrapper.channel).publish({
    username: isUser.username,
    receiverEmail: isUser.email,
    template: "resetPasswordSuccess",
  });

  return res.json({ message: "Password reset successfully" });
};

export default resetPassword;
