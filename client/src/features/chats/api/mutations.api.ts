import { chat__axios } from "@/axios.service";
import { CreateConversationForm } from "@/features/chats/schemas/create-conversation.schema";
import { CreateMessageForm } from "@/features/chats/schemas/create-message.schema";
import { Conversation } from "@/schemas";

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
