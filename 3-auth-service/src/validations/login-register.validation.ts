// ** Third party imports
import { z } from "zod";

// ** Register Validation
export const userRegistrationSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  profilePicture: z
    .string()
    .min(1, "Profile picture is required")
    .max(5000000, "Profile picture data is too large for initial processing."),
  country: z.string().min(1, "Country is a required field"),
});
export type UserRegistrationInput = z.infer<typeof userRegistrationSchema>;

// ** Login Validation
export const userLoginSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});
export type UserLoginInput = z.infer<typeof userLoginSchema>;
