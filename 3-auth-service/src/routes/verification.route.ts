// ** Third party imports
import * as crypto from "node:crypto";
import {
  BadRequestError,
  NotFoundError,
  RequestValidationError,
} from "@fvoid/shared-lib";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { sign } from "hono/jwt";

// ** Local imports
import { config } from "@src/config";
import { db } from "@src/drizzle/db";
import { AuthTable } from "@src/drizzle/schema";
import {
  resendEmailSchema,
  tokenSchema,
} from "@src/validations/verification.validation";
import { mqWrapper } from "@src/rabbitmq-wrapper";
import { SendEmailPublisher } from "@src/events/publishers/send-email-publisher";

// ** Hono App
const verficationRouter = new Hono();

// ** Email verfication
verficationRouter.put(
  "/verify-email",
  zValidator("json", tokenSchema, (result) => {
    if (!result.success) throw new RequestValidationError(result?.error.issues);
  }),

  async (c) => {
    // Extract token
    const { token } = c.req.valid("json");

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
    return c.json({ message: "Account verify successfully" });
  }
);

// ** Opt verfication
verficationRouter.put("/verify-otp/:otp", async (c) => {
  // Extract OTP
  const otp = c.req.param("otp");
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

  const userJWT = await sign(payload, config.JWT_TOKEN);

  // Return response
  return c.json(
    { message: "OTP verified successfully ", user: isUser, token: userJWT },
    201
  );
});

// ** Resend Email
verficationRouter.post(
  "/resend-email",
  zValidator("json", resendEmailSchema, (result) => {
    if (!result.success) throw new RequestValidationError(result?.error.issues);
  }),

  async (c) => {
    // Extract Data
    const { email } = c.req.valid("json");

    // Find the user by email
    const isUser = await db
      .select()
      .from(AuthTable)
      .where(eq(AuthTable.email, email))
      .limit(1)
      .then((res) => res[0]);

    if (!isUser) throw new NotFoundError();

    // Generate verfication link
    const randomCharacters = crypto.randomBytes(20).toString("hex");
    const verificationLink = `${config.CLIENT_URL}/confirm_email?v_token=${randomCharacters}`;

    // Update User
    await db
      .update(AuthTable)
      .set({ emailVerificationToken: randomCharacters })
      .where(eq(AuthTable.id, isUser.id));

    // Publish Event
    new SendEmailPublisher(mqWrapper.channel).publish({
      receiverEmail: isUser.email!,
      verifyLink: verificationLink,
      template: "verifyEmail",
      username: isUser.username,
    });

    // Fetch updated user
    const updatedUser = await db
      .select()
      .from(AuthTable)
      .where(eq(AuthTable.email, email))
      .limit(1)
      .then((res) => res[0]);

    // Return Response
    return c.json({
      message: "Email verification sent",
      user: updatedUser,
    });
  }
);

export default verficationRouter;
