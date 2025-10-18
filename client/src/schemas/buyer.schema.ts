import { z } from "zod";

export const BuyersSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
  profilePublicId: z.string(),
  profilePicture: z.string().url(),
  // ** optional
  country: z.string().nullable().optional(),
  isSeller: z.boolean().optional(),
  createdAt: z.date().optional(),

  ratingsCount: z.number().int().optional(),
  ratingSum: z.number().int().optional(),
  ratingCategories: z
    .object({
      five: z.object({ star: z.number().int(), count: z.number().int() }),
      four: z.object({ star: z.number().int(), count: z.number().int() }),
      three: z.object({ star: z.number().int(), count: z.number().int() }),
      two: z.object({ star: z.number().int(), count: z.number().int() }),
      one: z.object({ star: z.number().int(), count: z.number().int() }),
    })
    .optional(),
});

export type Buyer = z.infer<typeof BuyersSchema>;
