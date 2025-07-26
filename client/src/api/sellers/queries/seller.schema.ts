import { z } from "zod";

export const LanguageSchema = z.object({
  language: z.string().min(1, "Language is required"),
  level: z.enum(["Native", "Conversational", "Fluent", "Basic"]), // Example levels, adjust as needed
});

export const ExperienceSchema = z
  .object({
    company: z.string().min(1, "Company name is required"),
    title: z.string().min(1, "Job title is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(), // Optional if currently working here
    description: z.string().optional(),
    currentlyWorkingHere: z.boolean(),
  })
  .refine(
    (data) => {
      if (!data.currentlyWorkingHere && !data.endDate) {
        return false; // endDate is required if not currently working here
      }
      return true;
    },
    {
      message: "End date is required if you are not currently working here.",
      path: ["endDate"],
    }
  );

export const EducationSchema = z.object({
  country: z.string().min(1, "Country is required"),
  university: z.string().min(1, "University is required"),
  title: z.string().min(1, "Degree title is required"),
  major: z.string().min(1, "Major is required"),
  year: z.string().min(4, "Year is required").max(4, "Year must be 4 digits"),
});

export const SocialLinkSchema = z.object({
  link: z.string().url("Must be a valid URL"),
  platform: z.string().min(1, "Platform is required"),
});

export const CertificateSchema = z.object({
  name: z.string().min(1, "Certificate name is required"),
  from: z.string().min(1, "Issuing body is required"),
  year: z.string().min(4, "Year is required").max(4, "Year must be 4 digits"),
});

export const SkillItemSchema = z.object({
  name: z.string().min(1, "Skill cannot be empty"),
});

export const sellerSchema = z.object({
  // fullname, onliner, description, responsetime

  fullName: z.string().min(2, "Full Name is required").max(50),
  username: z.string().min(3, "Username is required").max(30),
  email: z.string().email("Invalid email address"),
  profilePicture: z.string().url("Must be a valid URL").optional(),
  description: z.string().max(500, "Description too long").optional(),
  oneliner: z.string().max(100, "One-liner too long").optional(),
  country: z.string().min(1, "Country is required"),
  languages: z.array(LanguageSchema).optional(),
  skills: z.array(SkillItemSchema).optional(), // Now an array of objects
  experience: z.array(ExperienceSchema).optional(),
  education: z.array(EducationSchema).optional(),
  socialLinks: z.array(SocialLinkSchema).optional(),
  certificates: z.array(CertificateSchema).optional(),
});

// export type SellerFormFields = z.infer<typeof sellerSchema>;
