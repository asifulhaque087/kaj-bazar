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
});

export type Buyer = z.infer<typeof BuyersSchema>;
