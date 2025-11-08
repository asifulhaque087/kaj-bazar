import { Auth } from "@/features/auth/schemas/auth.schema";
import { z } from "zod";

// ** --- Login Form Field---
export const loginForm = z.object({
  email: z.string().min(1, "Email is required").email("Must be valid email"),
  password: z.string().min(6),
});

export type LoginForm = z.infer<typeof loginForm>;

// ** --- Login Payload ---
export type LoginPayload = z.infer<typeof loginForm>;

export interface LoginApi {
  message: string;
  user: Auth;
  token: string;
}
