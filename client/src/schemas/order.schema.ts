import { z } from "zod";

const ExtensionRequestSchema = z.object({
  oldDate: z.string(),
  newDate: z.string(),
  reason: z.string().nullable(),
  tempReason: z.string().nullable(),
  accepted: z.boolean().nullable(),
});

const DeliveredWorkSchema = z.object({
  message: z.string().optional(),
  file: z.string(),
});

export type DeliveredWork = z.infer<typeof DeliveredWorkSchema>;

const ReviewSchema = z.object({
  rating: z.number(),
  review: z.string(),
  receivedAt: z.string(),
});

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  profilePicture: z.string(),
  country: z.string().nullable().optional(),
});

const GigSchema = z.object({
  id: z.string(),
  title: z.string(),
  basicTitle: z.string(),
  description: z.string(),
  basicDescription: z.string(),
  coverImage: z.string(),
});

const OrderStatusSchema = z.enum(["incomplete", "progress", "complete"]);

// for reading order
export const orderSchema = z.object({
  id: z.string().uuid(),
  messageId: z.string().uuid(),
  paymentIntent: z.string(),
  price: z.number().int(),
  gig: GigSchema,
  buyer: UserSchema,
  seller: UserSchema,
  // deliveryDueDate: z.string().datetime(),
  deliveryInDays: z.number(),
  deliveryDueDate: z.string(),
  orderStatus: OrderStatusSchema.default("incomplete"),

  // ** Optional fields  in reading and creating

  placeOrderAt: z.string().datetime().optional(),
  requirement: z.string().nullable().optional(),
  requirementAt: z.string().datetime().nullable().optional(),
  orderStartedAt: z.string().datetime().nullable().optional(),
  requestExtensions: z.array(ExtensionRequestSchema).nullable().optional(),
  deliveredWorks: z.array(DeliveredWorkSchema).nullable().optional(),
  orderDeliveredAt: z.string().datetime().nullable().optional(),
  sellerReceivedReview: ReviewSchema.nullable().optional(),
  buyerReceivedReview: ReviewSchema.nullable().optional(),
  accepted: z.boolean().nullable().optional(),
  acceptedAt: z.string().datetime().nullable().optional(),
});

export type Order = z.infer<typeof orderSchema>;


