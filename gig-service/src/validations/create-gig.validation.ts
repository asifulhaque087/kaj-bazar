import { z } from "zod";

// Define the schema for a single SubCategory object
const SubCategorySchema = z.object({
  title: z.string().min(1, "Sub-category title cannot be empty"),
});

// Define the schema for a single Tag object
const TagSchema = z.object({
  title: z.string().min(1, "Tag title cannot be empty"),
});

// Zod validation schema for inserting a new gig
export const insertGigSchema = z.object({
  sellerId: z.string().uuid("Invalid seller ID format"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  profilePicture: z.string().url("Invalid URL for profile picture"),
  title: z.string().min(5, "Title must be at least 5 characters long"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters long"),
  basicTitle: z
    .string()
    .min(5, "Basic title must be at least 5 characters long"),
  basicDescription: z
    .string()
    .min(20, "Basic description must be at least 20 characters long"),
  category: z.string().min(1, "Category cannot be empty"),
  subCategories: z
    .array(SubCategorySchema)
    .min(1, "At least one sub-category is required"),
  expectedDelivery: z.string().min(1, "Expected delivery cannot be empty"),
  coverImage: z.string().url("Invalid URL for cover image"),
  price: z.number().int().positive("Price must be a positive integer"),
  tags: z.array(TagSchema).optional(),
});

export type InsertGigInput = z.infer<typeof insertGigSchema>;
