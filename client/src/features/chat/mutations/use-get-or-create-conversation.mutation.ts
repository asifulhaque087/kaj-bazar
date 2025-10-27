import { useMutation } from "@tanstack/react-query";
import { useChatStore } from "@/store/use-chat.store";
import { useRouter } from "next/navigation";
import { CreateConversationForm } from "@/features/chat/schemas/create-conversation.schema";
import { findOrCreateConversationApi } from "@/features/chat/api/mutations.api";

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
};
