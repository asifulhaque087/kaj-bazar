// ** Third party imports
import { z } from "zod";

// ** Find or Create Conversation Validation

export const findOrCreateConversationSchema = z.object({
  senderUsername: z.string().min(1, "sender name is required"),
  receiverUsername: z.string().min(1, "receiver name is required"),
});
export type FindOrCreateConversationInput = z.infer<
  typeof findOrCreateConversationSchema
>;
