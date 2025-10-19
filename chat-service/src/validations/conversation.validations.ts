// ** Third party imports
import { z } from "zod";

// ** Find or Create Conversation Validation

export const findOrCreateConversationSchema = z.object({
  senderUsername: z.string().min(1, "sender name is required"),
  senderProfilePhoto: z.string().min(1, "sender profile photo is required"),
  receiverUsername: z.string().min(1, "receiver name is required"),
  receiverProfilePhoto: z.string().min(1, "receiver profile photo is required"),
});
export type FindOrCreateConversationInput = z.infer<
  typeof findOrCreateConversationSchema
>;
