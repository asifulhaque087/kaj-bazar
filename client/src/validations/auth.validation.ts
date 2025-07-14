import { z } from "zod";

export const authValidation = z.object({
  username: z
    .string()
    .min(1, "User name is required")
    .min(3, "Minimum 3 chars required"),
  email: z.email().min(3, "Minimum 3 chars required"),
});

export type AuthFormField = z.infer<typeof authValidation>;
