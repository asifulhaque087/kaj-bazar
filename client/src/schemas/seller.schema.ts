// import { z } from "zod";

// export const LanguageSchema = z.object({
//   language: z.string().min(1, "Language is required"),
//   level: z.enum(["Native", "Conversational", "Fluent", "Basic"]), // Example levels, adjust as needed
// });

// export const ExperienceSchema = z
//   .object({
//     company: z.string().min(1, "Company name is required"),
//     title: z.string().min(1, "Job title is required"),
//     startDate: z.string().min(1, "Start date is required"),
//     endDate: z.string().optional(), // Optional if currently working here
//     description: z.string().optional(),
//     currentlyWorkingHere: z.boolean(),
//   })
//   .refine(
//     (data) => {
//       if (!data.currentlyWorkingHere && !data.endDate) {
//         return false; // endDate is required if not currently working here
//       }
//       return true;
//     },
//     {
//       message: "End date is required if you are not currently working here.",
//       path: ["endDate"],
//     }
//   );

// export const EducationSchema = z.object({
//   country: z.string().min(1, "Country is required"),
//   university: z.string().min(1, "University is required"),
//   title: z.string().min(1, "Degree title is required"),
//   major: z.string().min(1, "Major is required"),
//   year: z.string().min(4, "Year is required").max(4, "Year must be 4 digits"),
// });

// export const SocialLinkSchema = z.object({
//   link: z.string().url("Must be a valid URL"),
//   platform: z.string().min(1, "Platform is required"),
// });

// export const CertificateSchema = z.object({
//   name: z.string().min(1, "Certificate name is required"),
//   from: z.string().min(1, "Issuing body is required"),
//   year: z.string().min(4, "Year is required").max(4, "Year must be 4 digits"),
// });

// export const SkillItemSchema = z.object({
//   name: z.string().min(1, "Skill cannot be empty"),
// });

// export const sellerSchema = z.object({
//   // fullname, onliner, description, responsetime

//   fullName: z.string().min(2, "Full Name is required").max(50),
//   username: z.string().min(3, "Username is required").max(30),
//   email: z.string().email("Invalid email address"),
//   profilePicture: z.string().url("Must be a valid URL").optional(),
//   description: z.string().max(500, "Description too long").optional(),
//   oneliner: z.string().max(100, "One-liner too long").optional(),
//   country: z.string().min(1, "Country is required"),
//   languages: z.array(LanguageSchema).optional(),
//   skills: z.array(SkillItemSchema).optional(), // Now an array of objects
//   experience: z.array(ExperienceSchema).optional(),
//   education: z.array(EducationSchema).optional(),
//   socialLinks: z.array(SocialLinkSchema).optional(),
//   certificates: z.array(CertificateSchema).optional(),
// });

// export type SellerFormFields = z.infer<typeof sellerSchema>;

// =========================

// seller.schema.ts
import { z } from "zod";

// --- Language Schemas ---
export const LanguageSchema = z.object({
  id: z.string().uuid(), // ID is required for an existing language entry
  language: z.string().min(1, "Language is required"),
  // level: z.enum(["Native", "Conversational", "Fluent", "Basic"]),
  level: z.string().min(1, "Level is required"),
});
export type Language = z.infer<typeof LanguageSchema>; // Keep base type for reading

const LanguageCreateSchema = LanguageSchema.omit({ id: true }); // Internal schema for creation
const LanguageUpdateSchema = LanguageSchema.partial().required({ id: true }); // Internal schema for update

// --- Experience Schemas ---
export const ExperienceSchema = z
  .object({
    id: z.string().uuid(), // ID is required for an existing experience entry
    company: z.string().min(1, "Company name is required"),
    title: z.string().min(1, "Job title is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    description: z.string().optional(),
    currentlyWorkingHere: z.boolean(),
  })
  .refine(
    (data) => {
      if (!data.currentlyWorkingHere && !data.endDate) {
        return false;
      }
      return true;
    },
    {
      message: "End date is required if you are not currently working here.",
      path: ["endDate"],
    }
  );
export type Experience = z.infer<typeof ExperienceSchema>; // Keep base type for reading

const ExperienceCreateSchema = ExperienceSchema.omit({ id: true }); // Internal schema for creation
const ExperienceUpdateSchema = ExperienceSchema.partial().required({
  id: true,
}); // Internal schema for update

// --- Education Schemas ---
export const EducationSchema = z.object({
  id: z.string().uuid(), // ID is required for an existing education entry
  country: z.string().min(1, "Country is required"),
  university: z.string().min(1, "University is required"),
  title: z.string().min(1, "Degree title is required"),
  major: z.string().min(1, "Major is required"),
  year: z.string().min(4, "Year is required").max(4, "Year must be 4 digits"),
});
export type Education = z.infer<typeof EducationSchema>; // Keep base type for reading

const EducationCreateSchema = EducationSchema.omit({ id: true }); // Internal schema for creation
const EducationUpdateSchema = EducationSchema.partial().required({ id: true }); // Internal schema for update

// --- SocialLink Schemas ---
export const SocialLinkSchema = z.object({
  id: z.string().uuid(), // ID is required for an existing social link entry
  link: z.string().url("Must be a valid URL"),
  platform: z.string().min(1, "Platform is required"),
});
export type SocialLink = z.infer<typeof SocialLinkSchema>; // Keep base type for reading

const SocialLinkCreateSchema = SocialLinkSchema.omit({ id: true }); // Internal schema for creation
const SocialLinkUpdateSchema = SocialLinkSchema.partial().required({
  id: true,
}); // Internal schema for update

// --- Certificate Schemas ---
export const CertificateSchema = z.object({
  id: z.string().uuid(), // ID is required for an existing certificate entry
  name: z.string().min(1, "Certificate name is required"),
  from: z.string().min(1, "Issuing body is required"),
  year: z.string().min(4, "Year is required").max(4, "Year must be 4 digits"),
});
export type Certificate = z.infer<typeof CertificateSchema>; // Keep base type for reading

const CertificateCreateSchema = CertificateSchema.omit({ id: true }); // Internal schema for creation
const CertificateUpdateSchema = CertificateSchema.partial().required({
  id: true,
}); // Internal schema for update

// --- SkillItem Schemas ---
export const SkillItemSchema = z.object({
  id: z.string().uuid(), // ID is required for an existing skill item
  name: z.string().min(1, "Skill cannot be empty"),
});
export type SkillItem = z.infer<typeof SkillItemSchema>; // Keep base type for reading

const SkillItemCreateSchema = SkillItemSchema.omit({ id: true }); // Internal schema for creation
const SkillItemUpdateSchema = SkillItemSchema.partial().required({ id: true }); // Internal schema for update

// --- Base Seller Schema (for reading/representing a full seller object) ---
export const sellerSchema = z.object({
  id: z.string().uuid(), // ID is required for a fully formed Seller object
  fullName: z.string().min(2, "Full Name is required").max(50),
  username: z.string().min(3, "Username is required").max(30),
  email: z.string().email("Invalid email address"),
  profilePicture: z.string().url("Must be a valid URL").optional(),
  description: z.string().max(500, "Description too long").optional(),
  oneliner: z.string().max(100, "One-liner too long").optional(),
  country: z.string().min(1, "Country is required"),
  // References the base schemas for nested arrays (for reading)
  languages: z.array(LanguageSchema).optional(),
  skills: z.array(SkillItemSchema).optional(),
  experience: z.array(ExperienceSchema).optional(),
  education: z.array(EducationSchema).optional(),
  socialLinks: z.array(SocialLinkSchema).optional(),
  certificates: z.array(CertificateSchema).optional(),
});
export type Seller = z.infer<typeof sellerSchema>;

// ** --- Seller Form ---
// 'id' is omitted for the main seller object
// Nested arrays use their respective 'Create' internal schemas
export const createSellerForm = sellerSchema.omit({ id: true }).extend({
  languages: z.array(LanguageCreateSchema).optional(),
  skills: z.array(SkillItemCreateSchema).optional(),
  experience: z.array(ExperienceCreateSchema).optional(),
  education: z.array(EducationCreateSchema).optional(),
  socialLinks: z.array(SocialLinkCreateSchema).optional(),
  certificates: z.array(CertificateCreateSchema).optional(),
});

export type CreateSellerForm = z.infer<typeof createSellerForm>;
export type CreateSellerPayload = z.infer<typeof createSellerForm>;

// ** --- Seller Update Form ---
// Main seller 'id' is required for update.
// Nested arrays use their respective 'Update' internal schemas (id is required for each item).
export const updateSellerForm = sellerSchema
  .partial()
  .required({ id: true })
  .extend({
    languages: z.array(LanguageUpdateSchema).optional(),
    skills: z.array(SkillItemUpdateSchema).optional(),
    experience: z.array(ExperienceUpdateSchema).optional(),
    education: z.array(EducationUpdateSchema).optional(),
    socialLinks: z.array(SocialLinkUpdateSchema).optional(),
    certificates: z.array(CertificateUpdateSchema).optional(),
  });

export type UpdateSellerForm = z.infer<typeof updateSellerForm>;
export type UpdateSellerPayload = z.infer<typeof updateSellerForm>;
