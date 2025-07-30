import { chat__axios } from "@/api/common/axios.service";
import {
  Conversation,
  CreateConversationForm,
  CreateMessageForm,
} from "@/schemas";

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
