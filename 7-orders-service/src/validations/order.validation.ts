import { z } from "zod";

const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
  profilePicture: z.string().url(),
  country: z.string().nullable().optional(),
});

const GigSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  basicTitle: z.string(),
  description: z.string(),
  basicDescription: z.string(),
  coverImage: z.string().url(),
});

export const createOrdersSchema = z.object({
  // id: z.string().uuid().optional(),
  messageId: z.string().uuid(),
  paymentIntent: z.string(),
  price: z.number().int().positive(),
  gig: GigSchema,
  buyer: UserSchema,
  seller: UserSchema,
  // deliveryDueDate: z.date(),
  // deliveryDueDate: z.string(),
  deliveryInDays: z.number(),
});

export type CreteOrderInput = z.infer<typeof createOrdersSchema>;

// export const selectOrdersSchema = z.object({
//   id: z.string().uuid(),
//   messageId: z.string().uuid(),
//   paymentIntent: z.string().nullable(),
//   price: z.number().int(),
//   gig: GigSchema,
//   buyer: UserSchema,
//   seller: UserSchema,
//   deliveryDueDate: z.date().nullable(),
// });
