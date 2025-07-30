import { useMutation } from "@tanstack/react-query";
import {
  createMessage,
  findOrCreateConversationApi,
} from "@/api/chats/chat.service";
import { CreateConversationForm, CreateMessageForm } from "@/schemas";
import { useAuthStore } from "@/store/use-auth.store";
import { useChatStore } from "@/store/use-chat.store";

export const useFindOrCreateConversation = () => {
  const { setSelectedConversation, setMessages } = useChatStore();

  return useMutation({
    mutationFn: (data: CreateConversationForm) =>
      findOrCreateConversationApi(data),
    onSuccess: (data) => {
      setSelectedConversation(data);
      setMessages(data.messages);
      // console.log("data after success is ", data);
    },
  });
};

export const useCreateMessage = () => {
  return useMutation({
    mutationFn: (data: CreateMessageForm) => createMessage(data),
  });
};
