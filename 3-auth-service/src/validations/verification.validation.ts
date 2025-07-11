// ** Third party imports
import { z } from "zod";

export const tokenSchema = z.object({
  token: z.string().min(3, { message: "Title must be at least 3 characters" }),
});

export const resendEmailSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  // userId: z.number(),
});
