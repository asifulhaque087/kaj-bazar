import { chat__axios } from "@/axios.service";
import { Conversation, Message } from "@/schemas";

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
