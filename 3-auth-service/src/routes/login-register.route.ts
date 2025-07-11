// ** Third party imports
import {
  BadRequestError,
  RequestValidationError,
  uploads,
} from "@fvoid/shared-lib";
import * as crypto from "node:crypto";
import { zValidator } from "@hono/zod-validator";
import { db } from "@src/drizzle/db";
import { AuthTable, insertAuthSchema } from "@src/drizzle/schema";
import { eq, or } from "drizzle-orm";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { type ZodIssue } from "zod";
import { config } from "@src/config";
import { hashPassword, verifyPassword } from "@src/utils/hashing.util";
import type { UploadApiResponse } from "cloudinary";
import { mqWrapper } from "@src/rabbitmq-wrapper";
import { loginValidation } from "@src/validations/login-register.validation";
import { SendEmailPublisher } from "@src/events/publishers/send-email-publisher";

const loginRegisterRouter = new Hono();

// ** Sign Up An User
loginRegisterRouter.post(
  "/signup",
  zValidator("json", insertAuthSchema, (result) => {
    if (!result.success)
      throw new RequestValidationError(result?.error.issues as ZodIssue[]);
  }),

  async (c) => {
    const {
      username,
      email,
      password,
      country,
      profilePicture,
      browserName,
      deviceType,
    } = c.req.valid("json");

    // Check if user exists by username or email
    const isUser = await db
      .select()
      .from(AuthTable)
      .where(or(eq(AuthTable.username, username), eq(AuthTable.email, email)))
      .limit(1)
      .then((res) => res[0]);

    if (isUser) throw new BadRequestError("User already exits");

    // Upload profile picture
    const profilePublicId = crypto.randomUUID();
    let uploadResult: UploadApiResponse;
    try {
      uploadResult = (await uploads(
        profilePicture,
        `${profilePublicId}`,
        true,
        true
      )) as UploadApiResponse;
    } catch (error) {
      console.error("Upload error:", error);
      throw new Error("File upload error. Try again.");
    }

    if (!uploadResult.public_id)
      throw new Error("File upload error. Try again.");

    // Generate email verification token
    const randomCharacters = crypto.randomBytes(20).toString("hex");

    // hash the password
    const hashedPassword = await hashPassword(password);

    // Prepare auth data
    const authData = {
      username,
      email,
      profilePublicId,
      password: hashedPassword,
      country,
      profilePicture: uploadResult?.secure_url,
      emailVerificationToken: randomCharacters,
      browserName,
      deviceType,
    };

    // Create auth user in database
    const result = await db
      .insert(AuthTable)
      .values(authData)
      .$returningId()
      .then((res) => res[0]);

    // Send email verification message to queue
    const verificationLink = `${config.CLIENT_URL}/confirm_email?v_token=${authData.emailVerificationToken}`;

    new SendEmailPublisher(mqWrapper.channel).publish({
      receiverEmail: authData.email!,
      verifyLink: verificationLink,
      template: "verifyEmail",
      username: authData.username
    });

    // Sign JWT token
    const payload = {
      id: result?.id,
      email: authData.email,
      username: authData.username,
      // exp: Math.floor(Date.now() / 1000) + 60 * 1, // 1 min
      exp: Math.floor(Date.now() / 1000) + 24 * 7 * 3600, // This will set the expiry to 7 days from now
    };

    const userJWT = await sign(payload, config.JWT_TOKEN);

    // Respond to client
    return c.json(
      {
        message: "User created successfully",
        user: { id: result?.id, ...authData },
        token: userJWT,
      },
      201
    );
  }
);

// ** Sign In An User
loginRegisterRouter.post(
  "/signin",

  zValidator("json", loginValidation, (result) => {
    if (!result.success)
      throw new RequestValidationError(result?.error.issues as ZodIssue[]);
  }),
  async (c) => {
    // Extract the data
    const { username, email, password } = c.req.valid("json");

    // Find isUser & throw error if !isUser
    const isUser = await db
      .select()
      .from(AuthTable)
      .where(or(eq(AuthTable.username, username), eq(AuthTable.email, email)))
      .limit(1)
      .then((res) => res[0]);

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

    const userJWT = await sign(payload, config.JWT_TOKEN);

    // Return response
    return c.json(
      { message: "User logged in successfully", user: isUser, token: userJWT },
      201
    );
  }
);

export default loginRegisterRouter;
