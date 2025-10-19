// ** Third party imports
import { z } from "zod";

// ** --- Nested Schemas ---
export const languageSchema = z.object({
  id: z.string(),
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
  id: z.string(),
  name: z.string().min(1, "Name is required"),
});

export const experienceSchema = z.object({
  id: z.string(),
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
  id: z.string(),
  university: z.string().min(1, "University is required"),
  title: z.string().min(1, "Title is required"),
  major: z.string().min(2, "Major name must be atleast 2 chars").optional(),
  year: z.string().min(1, "Enter a valid year").optional(),
  country: z.string().min(2, "Country name atlest 2 chars").optional(),
});

export const socialLinkSchema = z.object({
  id: z.string(),
  platform: z.string().min(1, "Platform name is required"),
  link: z.string().min(1, "Profile link is required"),
});

export const certificateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Certificate name is required"),
  from: z.string().min(1, "From must atlest 2 chars").optional(),
  year: z.string().min(1, "Enter a valid year").optional(),
});

// ** --- Main create seller validation ---
export const updateSellerSchema = z.object({
  id: z.string().min(1, "Id is required"),
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

  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .optional(), // Mark optional based on initial Mongoose schema's default

  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .optional(), // Optional per your Mongoose schema default

  oneliner: z
    .string()
    .min(3, "Oneliner must be at least 3 characters")
    .optional(),

  // Nested arrays
  languages: z.array(languageSchema).default([]),
  removedLangIds: z.array(z.object({ id: z.string() })),

  skills: z.array(skillSchema).default([]),
  removedSkillIds: z.array(z.object({ id: z.string() })),

  experience: z.array(experienceSchema).default([]),
  removedExperienceIds: z.array(z.object({ id: z.string() })),

  education: z.array(educationSchema).default([]),
  removedEducationIds: z.array(z.object({ id: z.string() })),

  socialLinks: z.array(socialLinkSchema).default([]),
  removedSocialLinkIds: z.array(z.object({ id: z.string() })),

  certificates: z.array(certificateSchema).default([]),
  removedCertificateIds: z.array(z.object({ id: z.string() })),
});

export type UpdateSellerInput = z.infer<typeof updateSellerSchema>;
