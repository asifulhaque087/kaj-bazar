// gig schema

import { z } from "zod";

const SubCategorySchema = z.object({
  title: z.string().min(1, "Sub-category title cannot be empty"),
});

// Define the schema for a single Tag object
const TagSchema = z.object({
  title: z.string().min(1, "Tag title cannot be empty"),
});

export const gigSchema = z.object({
  id: z.string().uuid(),
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
  coverImage: z.string().min(1, "Cover image is required"),
  // price: z.number().int().positive("Price must be a positive integer"),
  // price: z.number(),
  price: z.coerce.number().int().positive("Price must be a positive integer"),

  // ** optional
  tags: z.array(TagSchema).nullable().optional(),
  active: z.boolean().optional(),
  ratingsCount: z.number().int().optional(), // Drizzle has default(0), so optional on creation
  ratingSum: z.number().int().optional(), // Drizzle has default(0), so optional on creation
  ratingCategories: z
    .object({
      five: z.object({ star: z.number().int(), count: z.number().int() }),
      four: z.object({ star: z.number().int(), count: z.number().int() }),
      three: z.object({ star: z.number().int(), count: z.number().int() }),
      two: z.object({ star: z.number().int(), count: z.number().int() }),
      one: z.object({ star: z.number().int(), count: z.number().int() }),
    })
    .optional(),
  sortId: z.number().int().nullable().optional(),
  createdAt: z.date().optional(),
});

export type Gig = z.infer<typeof gigSchema>;

export const createGigForm = gigSchema.omit({ id: true });

export type CreateGigForm = z.infer<typeof createGigForm>;
export type CreateGigPayload = z.infer<typeof createGigForm>;
