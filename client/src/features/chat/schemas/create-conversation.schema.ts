import { conversationSchema } from "@/features/shared";
import z from "zod";

export const createConversationForm = conversationSchema.omit({
  id: true,
  messages: true,
});

export type CreateConversationForm = z.infer<typeof createConversationForm>;
