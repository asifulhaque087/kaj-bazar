import { useMutation } from "@tanstack/react-query";
import {
  createMessage,
  findOrCreateConversationApi,
} from "@/api/chats/chat.service";
import {
  Auth,
  Conversation,
  CreateConversationForm,
  CreateMessageForm,
} from "@/schemas";
import { useAuthStore } from "@/store/use-auth.store";
import { useChatStore } from "@/store/use-chat.store";
import { useRouter } from "next/navigation";

export const useFindOrCreateConversation = () => {
  const { setSelectedConversation, setMessages } = useChatStore();
  // const { authUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateConversationForm) =>
      findOrCreateConversationApi(data),
    onSuccess: (data) => {
      setSelectedConversation(data);
      setMessages(data.messages);
      // console.log("data after success is ", data);

      // router.push(`/inbox?conversation=${data.id}?other=${findOtherUser(authUser, data)}`);
      router.push(`/inbox?conversation=${data.id}`);
    },
  });

  function findOtherUser(authUser: Auth | null, con: Conversation): string {
    return authUser?.username === con.receiverUsername
      ? con.senderUsername
      : con.receiverUsername;
  }
};

export const useCreateMessage = () => {
  return useMutation({
    mutationFn: (data: CreateMessageForm) => createMessage(data),
  });
};
