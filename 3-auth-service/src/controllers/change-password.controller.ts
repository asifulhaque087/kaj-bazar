// ** Third Party Imports
import type { ChangePasswordInput } from "@src/validations/password.validation";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

// ** Local Imports
import {
  handleAsync,
  NotAuthorizedError,
  NotFoundError,
} from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { AuthTable } from "@src/drizzle/schema";
import { SendEmailPublisher } from "@src/events/publishers/send-email-publisher";
import { mqWrapper } from "@src/rabbitmq-wrapper";
import { hashPassword } from "@src/utils/hashing.util";

const changePassword = async (req: Request, res: Response) => {
  // extract data
  const { password } = req.body as ChangePasswordInput;

  // get current user email and find user
  const user = req.user;

  if (!user) throw new NotAuthorizedError();

  const isUser = await handleAsync(
    db
      .select()
      .from(AuthTable)
      .where(eq(AuthTable.email, user.email))
      .limit(1)
      .then((res) => res[0])
  );

  if (!isUser) throw new NotFoundError();

  // hash password and update user
  const hashedPassword = await hashPassword(password);

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

  // send response
  return res.json({ message: "Password change succesfully" });
};

export default changePassword;
