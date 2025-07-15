// ** Third party imports
import { z } from "zod";

// forgot password validation schema
export const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

// reset password validation schema
export const resetPasswordSchema = z.object({
  password: z.string().min(6, { message: "Password is required" }),
});
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// change password validation schema

export const changePasswordSchema = z.object({
  password: z.string().min(6, { message: "Password is required" }),
});
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
