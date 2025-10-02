import { z } from "zod";

// Define the Zod schema for the Offer object
export const OfferSchema = z.object({
  gigTitle: z.string(),
  gigId: z.string().optional(),
  price: z.number(),
  description: z.string(),
  deliveryInDays: z.number(),

  // ** --- optional ---
  oldDeliveryDate: z.string().optional(),
  newDeliveryDate: z.string().optional(),
  accepted: z.boolean().optional(),
  cancelled: z.boolean().optional(),
});

// Zod schema for the MessagesTable
export const messageSchema = z.object({
  id: z.string().uuid(), // UUID is generated, so optional for creation
  conversationId: z.string().uuid().min(1, "conversation id is required"),
  senderUsername: z.string().min(1, "sender name is required"),
  receiverUsername: z.string().min(1, "receiver name is required"),
  senderPicture: z.string().min(1, "sender picture is required"),
  receiverPicture: z.string().min(1, "receiver picture is required"),
  // buyerId: z.string().uuid().min(1, "buyer id is required"),
  // sellerId: z.string().uuid().min(1, "seller id is required"),

  // ** optional
  body: z.string().optional(),
  file: z.string().optional(),
  fileType: z.string().optional(),
  fileSize: z.string().optional(),
  fileName: z.string().optional(),
  isRead: z.boolean().optional(),
  hasOffer: z.boolean().optional(),
  offer: OfferSchema.optional(),
  // createdAt: z.date().optional(), // Drizzle's defaultNow maps to a Date object, optional for creation
  createdAt: z.string().optional(), // Drizzle's defaultNow maps to a Date object, optional for creation
});

export type Message = z.infer<typeof messageSchema>;

// Schema for creating a new message (e.g., in a POST request body)
export const createMessageForm = messageSchema.omit({
  id: true,
  createdAt: true,
});
// .extend({
//   offer: OfferSchema.extend({
//     price: z.number().nullable(),
//   }).optional(),
// });
export type CreateMessageForm = z.infer<typeof createMessageForm>;

export const conversationSchema = z.object({
  id: z.uuid(),
  senderUsername: z.string().min(1, "sender name is required"),
  senderProfilePhoto: z.string().min(1, "sender profile is required"),
  receiverUsername: z.string().min(1, "receiver name is required"),
  receiverProfilePhoto: z.string().min(1, "receiver profile photo is required"),
  messages: z.array(messageSchema).default([]),
});

export type Conversation = z.infer<typeof conversationSchema>;

export const createConversationForm = conversationSchema.omit({
  id: true,
  messages: true,
});

export type CreateConversationForm = z.infer<typeof createConversationForm>;
