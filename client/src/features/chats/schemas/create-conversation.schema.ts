import z from "zod";
import { conversationSchema } from "@/schemas";

export const createConversationForm = conversationSchema.omit({
  id: true,
  messages: true,
});

export type CreateConversationForm = z.infer<typeof createConversationForm>;
