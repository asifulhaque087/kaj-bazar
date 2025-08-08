import { z } from "zod";

export const buyerReviewSellerSchema = z.object({
  gigId: z.string().uuid(),
  gigImage: z.string().url(),
  gigTitle: z.string(),

  orderId: z.string().uuid(),
  buyerId: z.string().uuid(),
  sellerId: z.string().uuid(),

  senderId: z.string().uuid(),
  senderUsername: z.string(),
  senderImage: z.string().url(),
  senderCountry: z.string().optional(),

  receiverId: z.string().uuid(),

  ratings: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});

export type BuyerReviewSellerInput = z.infer<typeof buyerReviewSellerSchema>;

export const sellerReviewBuyerSchema = z.object({
  gigId: z.string().uuid(),
  gigImage: z.string().url(),
  gigTitle: z.string(),

  orderId: z.string().uuid(),
  buyerId: z.string().uuid(),
  sellerId: z.string().uuid(),

  senderId: z.string().uuid(),
  senderUsername: z.string(),
  senderImage: z.string().url(),
  senderCountry: z.string().optional(),

  receiverId: z.string().uuid(),

  ratings: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});

export type SellerReviewBuyerInput = z.infer<typeof sellerReviewBuyerSchema>;
