import { chat__axios } from "@/api/common/axios.service";
import {
  Conversation,
  CreateConversationForm,
  CreateMessageForm,
  Message,
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

export const getConversationsByUsername = async (username: string) => {
  console.log("user name is ", username);
  const response = await chat__axios.get<Conversation[]>(
    `/conversation/get-conversations/${username}`
  );
  return response.data;
};

export const getConversationsById = async (id: string) => {
  const response = await chat__axios.get<Conversation>(
    `/conversation/get-conversation/${id}`
  );
  return response.data;
};

export const getMessageById = async (id: string) => {
  const response = await chat__axios.get<Message>(`/message/${id}`);
  return response.data;
};
