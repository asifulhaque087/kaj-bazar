import { conversationSchema } from "@/features/chat/schemas/chat.schema";
import z from "zod";

export const createConversationForm = conversationSchema.omit({
  id: true,
  messages: true,
});

export type CreateConversationForm = z.infer<typeof createConversationForm>;
