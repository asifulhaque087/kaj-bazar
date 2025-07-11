// ** Third party imports

import * as crypto from "node:crypto";
import {
  BadRequestError,
  NotFoundError,
  RequestValidationError,
} from "@fvoid/shared-lib";
import { zValidator } from "@hono/zod-validator";
import { db } from "@src/drizzle/db";
import { AuthTable } from "@src/drizzle/schema";
import { type ZodIssue } from "zod";
import {
  changePasswordValidation,
  forgotPasswordSchema,
  resetPasswordValidation,
} from "@src/validations/password.validation";
import { and, eq, gt } from "drizzle-orm";
import { Hono } from "hono";
import { config } from "@src/config";
import { mqWrapper } from "@src/rabbitmq-wrapper";
import { hashPassword } from "@src/utils/hashing.util";
import { verifyClientToken } from "@src/middlewares/verfiyClientToken.middleware";
import { SendEmailPublisher } from "@src/events/publishers/send-email-publisher";

const passwordRouter = new Hono();

// ** Forgot Password
passwordRouter.put(
  "/forgot-password",

  zValidator("json", forgotPasswordSchema, (result) => {
    if (!result.success) throw new RequestValidationError(result?.error.issues);
  }),

  async (c) => {
    // extract data
    const { email } = c.req.valid("json");

    // find user by email
    const isUser = await db
      .select()
      .from(AuthTable)
      .where(eq(AuthTable.email, email))
      .limit(1)
      .then((res) => res[0]);

    if (!isUser) throw new BadRequestError("Invalid credentials");

    // generate new token and update user
    const randomCharacters = crypto.randomBytes(20).toString("hex");
    const date: Date = new Date();
    date.setHours(date.getHours() + 1);

    await db
      .update(AuthTable)
      .set({ passwordResetToken: randomCharacters, passwordResetExpires: date })
      .where(eq(AuthTable.id, isUser.id));

    // send email
    const passwordResetLink = `${config.CLIENT_URL}/reset_password?token=${randomCharacters}`;

    new SendEmailPublisher(mqWrapper.channel).publish({
      receiverEmail: email!,
      resetLink: passwordResetLink,
      username: isUser.username,
      template: "forgotPassword",
    });

    // send response
    return c.json({ message: "Reset password link sent" });
  }
);

// ** Reset Password
passwordRouter.put(
  "/reset-password/:token",

  zValidator("json", resetPasswordValidation, (result) => {
    if (!result.success)
      throw new RequestValidationError(result?.error.issues as ZodIssue[]);
  }),

  async (c) => {
    // extract data
    const { password } = c.req.valid("json");
    const { token } = c.req.param();

    // Find user by token
    // const isUser = await db
    //   .select()
    //   .from(AuthTable)
    //   .where(eq(AuthTable.passwordResetToken, token))
    //   .limit(1)
    //   .then((res) => res[0]);

    const isUser = await db.query.AuthTable.findFirst({
      where: and(
        eq(AuthTable.passwordResetToken, token),
        gt(AuthTable.passwordResetExpires, new Date())
      ),
    });

    if (!isUser) throw new BadRequestError("Invalid token");

    // hash the password
    const hashedPassword = await hashPassword(password);

    // update password
    await db
      .update(AuthTable)
      .set({
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      })
      .where(eq(AuthTable.id, isUser.id));

    // send email
    new SendEmailPublisher(mqWrapper.channel).publish({
      username: isUser.username,
      receiverEmail: isUser.email,
      template: "resetPasswordSuccess",
    });

    return c.json({ message: "Password reset successfully" });
  }
);

// ** Change Password
passwordRouter.put(
  "/change-password",
  verifyClientToken,
  zValidator("json", changePasswordValidation, (result) => {
    if (!result.success)
      throw new RequestValidationError(result?.error.issues as ZodIssue[]);
  }),

  async (c) => {
    // extract data
    const { password } = c.req.valid("json");

    // get current user email and find user
    const user = c.get("user");

    const isUser = await db
      .select()
      .from(AuthTable)
      .where(eq(AuthTable.email, user.email))
      .limit(1)
      .then((res) => res[0]);

    if (!isUser) throw new NotFoundError();

    // hash password and update user
    const hashedPassword = await hashPassword(password);

    await db
      .update(AuthTable)
      .set({
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      })
      .where(eq(AuthTable.id, isUser.id));

    // send email
    new SendEmailPublisher(mqWrapper.channel).publish({
      username: isUser.username,
      receiverEmail: isUser.email,
      template: "resetPasswordSuccess",
    });

    // send response
    return c.json({ message: "Password change succesfully" });
  }
);

export default passwordRouter;
