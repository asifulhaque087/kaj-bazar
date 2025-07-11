// ** Third party imports
import { insertAuthSchema } from "@src/drizzle/schema";
import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
});

export const resetPasswordValidation = insertAuthSchema.pick({
  password: true,
});

export const changePasswordValidation = insertAuthSchema.pick({
  password: true,
});
