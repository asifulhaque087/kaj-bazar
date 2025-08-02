import {
  getConversationsById,
  getConversationsByUsername,
} from "@/api/chats/chat.service";
import {
  UseGetConversationsByIdProps,
  UseGetConversationsByUsernameProps,
} from "@/api/chats/chat.types";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { useChatStore } from "@/store/use-chat.store";
import { useQuery } from "@tanstack/react-query";

export const useGetConversationsByUsername = (
  props: UseGetConversationsByUsernameProps
) => {
  const { authUser } = props;

  return useQuery({
    queryKey: ["conversations", authUser?.username],
    queryFn: () => getConversationsByUsername(authUser?.username!),
    enabled: !!authUser?.username,
  });
};

// export const useGetConversationsById = (
//   props: UseGetConversationsByIdProps
// ) => {
//   const { conversationId } = props;

//   return useQuery({
//     queryKey: ["conversations", conversationId],
//     queryFn: () => getConversationsById(conversationId),
//     enabled: !!conversationId,
//   });
// };

// export const useGetConversationsById = (
//   props: UseGetConversationsByIdProps
// ) => {
//   const { conversationId } = props;

//   return useQueryWithSideEffects({
//     queryKey: ["conversations", conversationId],
//     queryFn: () => getConversationsById(conversationId),
//     enabled: !!conversationId,
//     onSuccess: (fetchedData) => {
//       console.log("Component-level: Data fetched and ready!", fetchedData);
//       // toast.success("Data loaded successfully!");
//     },
//     onError: (err) => {
//       console.error("Component-level: Error fetching data:", err.message);
//       // toast.error(`Failed to load data: ${err.message}`);
//     },
//     onSettled: (settledData, settledError) => {
//       console.log("Component-level: Query settled.");
//       // This will run whether it was success or error
//     },
//   });
// };

export const useGetConversationsById = (
  props: UseGetConversationsByIdProps
) => {
  const { conversationId } = props;

  const { setMessages, setSelectedConversation } = useChatStore();

  return useQueryWithSideEffects({
    queryKey: ["conversations", conversationId],
    queryFn: () => getConversationsById(conversationId),
    enabled: !!conversationId,
    onSuccess: (fetchedData) => {
      setSelectedConversation(fetchedData);
      setMessages(fetchedData.messages);
    },
    onError: (err) => {},
    onSettled: (settledData, settledError) => {},
  });
};
