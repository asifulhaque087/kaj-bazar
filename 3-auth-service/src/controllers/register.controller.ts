// ** Third Party Imports
import type { UploadApiResponse } from "cloudinary";
import jwt from "jsonwebtoken";
import { eq, or } from "drizzle-orm";
import type { Request, Response } from "express";
import * as crypto from "node:crypto";

// ** Local Imports
import { BadRequestError, handleAsync, uploads } from "@fvoid/shared-lib";
import { config } from "@src/config";
import { db } from "@src/db";
import { AuthTable } from "@src/schemas";
import { hashPassword } from "@src/utils/hashing.util";
import type { UserRegistrationInput } from "@src/validations/login-register.validation";
import { SendEmailPublisher } from "@src/events/publishers/send-email-publisher";
import { mqWrapper } from "@src/rabbitmq-wrapper";

const register = async (req: Request, res: Response) => {
  const {
    username,
    email,
    password,
    country,
    profilePicture,
    // browserName,
    // deviceType,
  } = req.body as UserRegistrationInput;

  // Find user by email or username

  const isUser = await handleAsync(
    db
      .select()
      .from(AuthTable)
      .where(or(eq(AuthTable.username, username), eq(AuthTable.email, email)))
      .limit(1)
      .then((res) => res[0])
  );

  if (isUser) throw new BadRequestError("User already exits");

  // Upload profile picture
  const profilePublicId = crypto.randomUUID();

  const uploadResult = (await handleAsync(
    uploads(profilePicture, `${profilePublicId}`, true, true)
  )) as UploadApiResponse;

  if (!uploadResult.public_id) throw new Error("File upload error. Try again.");

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
    // browserName,
    // deviceType,
  };

  // Create auth user in database
  const result = await handleAsync(
    db
      .insert(AuthTable)
      .values(authData)
      .returning()
      .then((res) => res[0])
  );

  // Send email verification message to queue
  const verificationLink = `${config.CLIENT_URL}/confirm_email?v_token=${authData.emailVerificationToken}`;

  new SendEmailPublisher(mqWrapper.channel).publish({
    receiverEmail: authData.email!,
    verifyLink: verificationLink,
    template: "verifyEmail",
    username: authData.username,
  });

  // Sign JWT token
  const payload = {
    id: result?.id,
    email: authData.email,
    username: authData.username,
    // exp: Math.floor(Date.now() / 1000) + 60 * 1, // 1 min
    exp: Math.floor(Date.now() / 1000) + 24 * 7 * 3600, // This will set the expiry to 7 days from now
  };

  const userJWT = jwt.sign(payload, config.JWT_TOKEN);

  // Respond to client
  return res.json({
    message: "User created successfully",
    user: result,
    token: userJWT,
  });
};

export default register;
