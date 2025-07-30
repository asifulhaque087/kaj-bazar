import { z } from "zod";

export const gigSchema = z.object({
  id: z.string().uuid(),
  sellerId: z.string().uuid().min(1, "Seller id is required"),
  username: z.string().min(1, "User name is required"),
  email: z.string().email().min(1, "Email is required"),
  profilePicture: z.string().url().min(1, "profile image is required"),
  title: z.string().min(1, "Gig title is required"),
  description: z.string().min(1, "Description is required"),
  basicTitle: z.string().min(1, "Basic title is required"),
  basicDescription: z.string().min(1, "Basic description is required"),
  category: z.string().min(1, "category is required"),
  subCategories: z.array(z.string()),
  expectedDelivery: z.string().min(1, "expected delivery is required"),
  coverImage: z.string().url().min(1, "gig image is required"),
  price: z.number().int().gt(1, "Gig price is required"),

  // ** optional
  tags: z.array(z.string()).nullable().optional(),
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
