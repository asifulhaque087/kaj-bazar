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
import { hashPassword } from "@src/utils/hashing.util";
import type { UploadApiResponse } from "cloudinary";
import { AuthCreatedPublisher } from "@src/events/publishers/auth-created-publisher";
import { mqWrapper } from "@src/rabbitmq-wrapper";

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

    // ** Check if user exists by username or email
    const isUser = await db
      .select()
      .from(AuthTable)
      .where(or(eq(AuthTable.username, username), eq(AuthTable.email, email)))
      .limit(1)
      .then((res) => res[0]);

    if (isUser) throw new BadRequestError("Incorrent data");

    // ** Upload profile picture

    console.log("file is ", profilePicture);

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

    // ** Generate email verification token

    const randomCharacters = crypto.randomBytes(20).toString("hex");

    // ** hash the password
    const hashedPassword = await hashPassword(password);

    //** Prepare auth data

    const authData = {
      username,
      email,
      profilePublicId,
      // profilePublicId: "profile-publid-id",
      password: hashedPassword,
      country,
      profilePicture: uploadResult?.secure_url,
      // profilePicture: "this is public pic",
      emailVerificationToken: randomCharacters,
      browserName,
      deviceType,
    };

    // ** Create auth user in database

    const result = await db
      .insert(AuthTable)
      .values(authData)
      .$returningId()
      .then((res) => res[0]);

    // ** Send email verification message to queue

    const verificationLink = `${config.CLIENT_URL}/confirm_email?v_token=${authData.emailVerificationToken}`;

    new AuthCreatedPublisher(mqWrapper.channel).publish({
      receiverEmail: authData.email!,
      verifyLink: verificationLink,
      template: "verifyEmail",
    });

    // ** Sign JWT token

    const payload = {
      id: result?.id,
      email: authData.email,
      username: authData.username,
      exp: Math.floor(Date.now() / 1000) + 60 * 1, // testing
      // exp: Math.floor(Date.now() / 1000) + 10 * 24 * 60 * 60,
    };

    const userJWT = await sign(payload, config.JWT_TOKEN);

    // ** Respond to client
    return c.json(
      { message: "User created successfully", user: result, token: userJWT },
      201
    );
  }
);

// ** Sign In An User
loginRegisterRouter.post("/signin", async (c) => {
  return c.json({ message: "I am from login" });
});

export default loginRegisterRouter;
