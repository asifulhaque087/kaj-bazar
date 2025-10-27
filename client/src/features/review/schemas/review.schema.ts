import { z } from "zod";

export const reviewSchema = z.object({
  id: z.string().uuid(),
  gigId: z.string().uuid(),
  gigImage: z.string().url(),
  gigTitle: z.string(),

  orderId: z.string().uuid(),
  buyerId: z.string().uuid(),
  sellerId: z.string().uuid(),

  senderId: z.string().uuid(),
  senderUsername: z.string(),
  senderImage: z.string().url(),
  senderCountry: z.string().nullable(),

  receiverId: z.string().uuid(),
  ratings: z.number().int().min(1).max(5),
  comment: z.string().optional(),
  reivewGivenAt: z.date(),
});

export type Review = z.infer<typeof reviewSchema>;

export const buyerReviewSellerForm = z.object({
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

export type BuyerReviewSellerForm = z.infer<typeof buyerReviewSellerForm>;
export type BuyerReviewSellerPayload = z.infer<typeof buyerReviewSellerForm>;

export const sellerReviewBuyerForm = z.object({
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

export type SellerReviewBuyerForm = z.infer<typeof sellerReviewBuyerForm>;
export type SellerReviewBuyerPayload = z.infer<typeof sellerReviewBuyerForm>;
