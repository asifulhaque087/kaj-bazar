// ** Third party imports
import { z } from "zod";

// ** --- Nested Schemas ---
export const languageSchema = z.object({
  language: z
    .string()
    .min(1, "Language is required")
    .min(2, "Language name must be at least 2 characters"),
  level: z
    .string()
    .min(1, "Level is required")
    .min(2, "Level name must be at least 2 characters"),
});

// export const skillSchema = z.string().min(1, "Skill cannot be empty");
export const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const experienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  title: z.string().min(1, "Title is required"),
  startDate: z.string().min(1, "Enter a valid data").optional(),
  endDate: z.string().min(1, "Enter a valid data").optional(),
  description: z
    .string()
    .min(5, "Description muste be atleast 5 chars long")
    .optional(),
  currentlyWorkingHere: z.boolean().default(false),
});

export const educationSchema = z.object({
  university: z.string().min(1, "University is required"),
  title: z.string().min(1, "Title is required"),
  major: z.string().min(2, "Major name must be atleast 2 chars").optional(),
  year: z.string().min(1, "Enter a valid year").optional(),
  country: z.string().min(2, "Country name atlest 2 chars").optional(),
});

export const socialLinkSchema = z.object({
  platform: z.string().min(1, "Platform name is required"),
  link: z.string().min(1, "Profile link is required"),
});

export const certificateSchema = z.object({
  name: z.string().min(1, "Certificate name is required"),
  from: z.string().min(1, "From must atlest 2 chars").optional(),
  year: z.string().min(1, "Enter a valid year").optional(),
});

// ** --- Main create seller validation ---
export const createSellerSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(3, "Full name must be at least 3 characters"),

  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Give a valid email address"),

  profilePicture: z
    .string()
    .max(5000000, "Profile picture data is too large for initial processing.")
    .optional(), // Make it optional for initial creation if user can upload later

  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .optional(), // Optional per your Mongoose schema default

  oneliner: z
    .string()
    .min(3, "Oneliner must be at least 3 characters")
    .optional(),

  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .optional(), // Mark optional based on initial Mongoose schema's default

  // Nested arrays
  languages: z.array(languageSchema).default([]), // Default to empty array if not provided
  skills: z.array(skillSchema).default([]),
  experience: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  socialLinks: z.array(socialLinkSchema).default([]),
  certificates: z.array(certificateSchema).default([]),

  // These fields are typically managed by the backend defaults or calculated
  // and might not be sent from the form. If the form can send them, define them.
  // Otherwise, they will be omitted from the input type.
  // ratingsCount: z.number().int().min(0).default(0),
  // ratingSum: z.number().int().min(0).default(0),
  // responseTime: z.number().int().min(0).default(0),
  // recentDelivery: z.string().datetime().optional(), // If provided as string
  // ongoingJobs: z.number().int().min(0).default(0),
  // completedJobs: z.number().int().min(0).default(0),
  // cancelledJobs: z.number().int().min(0).default(0),
  // totalEarnings: z.number().min(0).default(0),
  // totalGigs: z.number().int().min(0).default(0),
});

export type CreateSellerInput = z.infer<typeof createSellerSchema>;
