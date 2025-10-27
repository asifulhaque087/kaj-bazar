import { chat__axios } from "@/axios.service";
import { CreateConversationForm } from "@/features/chat/schemas/create-conversation.schema";
import { CreateMessageForm } from "@/features/chat/schemas/create-message.schema";
import { Conversation } from "@/features/chat/schemas/chat.schema";

export const findOrCreateConversationApi = async (
  data: CreateConversationForm
) => {
  const response = await chat__axios.post<Conversation>(
    `/conversation/find-or-create`,
    data
  );
  return response.data;
};

export const createMessage = async (data: CreateMessageForm) => {
  const response = await chat__axios.post(`/message/create-message`, data);
  return response.data;
};
