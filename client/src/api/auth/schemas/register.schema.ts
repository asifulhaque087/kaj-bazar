import { z } from "zod";

export const registerValidation = z
  .object({
    username: z.string().min(1, "Username is required."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Confirm Password is required."),
    profilePicture: z.string().min(1, "profile picture is required"),
  })
  .superRefine((data, ctx) => {
    // Custom validation for password and confirmPassword
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match.",
        path: ["confirmPassword"], // This ensures the error message appears under confirmPassword
      });
    }
  });

export type RegisterFormField = z.infer<typeof registerValidation>;

// Define a new schema that omits 'confirmPassword'
export const registerSchema = registerValidation.omit({
  confirmPassword: true,
});

// Infer the type from the new schema
export type RegisterSchema = z.infer<typeof registerSchema>;
