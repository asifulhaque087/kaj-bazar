import { z } from "zod";
// ** --- Register Form Field ---
export const registerForm = z
  .object({
    username: z.string().min(1, "User name is required"),
    email: z.string().min(1, "Email is requried").email("Must be valid email"),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Confirm Password is required."),
    profilePicture: z.string().min(1, "profile picture is required"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match.",
        path: ["confirmPassword"], // This ensures the error message appears under confirmPassword
      });
    }
  });

export type RegisterForm = z.infer<typeof registerForm>;

// ** --- Register payload ---
const registerPayload = registerForm.omit({
  confirmPassword: true,
});

export type RegisterPayload = z.infer<typeof registerPayload>;
