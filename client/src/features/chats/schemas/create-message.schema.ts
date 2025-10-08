import z from "zod";
import { messageSchema } from "@/schemas";

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
