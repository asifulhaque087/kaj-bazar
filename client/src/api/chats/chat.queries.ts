import {
  getConversationsById,
  getConversationsByUsername,
  getMessageById,
} from "@/api/chats/chat.service";
import {
  UseGetConversationsByIdProps,
  UseGetConversationsByUsernameProps,
  UseGetMessageByIdProps,
} from "@/api/chats/chat.types";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { useAuthStore } from "@/store/use-auth.store";
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
  const { authUser, role } = useAuthStore();

  const {
    setMessages,
    setSelectedConversation,
    setMessageSenderUser,
    setMessageReceiverUser,
  } = useChatStore();

  return useQueryWithSideEffects({
    queryKey: ["conversations", conversationId],
    queryFn: () => getConversationsById(conversationId),
    enabled: !!conversationId && !!authUser?.id,
    onSuccess: (fetchedData) => {
      setSelectedConversation(fetchedData);
      setMessages(fetchedData.messages);

      // setMessageSenderUser({
      //   name: authUser?.username!,
      //   profilePhoto: authUser?.profilePicture!,
      // });

      const {
        senderUsername,
        senderProfilePhoto,
        receiverUsername,
        receiverProfilePhoto,
      } = fetchedData;

      if (senderUsername === authUser?.username) {
        console.log("hellow how @#@#$@#$#@#$@@#$");
        if (role !== "buyer") console.log("show modal to switch to buyer");

        setMessageSenderUser({
          name: senderUsername,
          profilePhoto: senderProfilePhoto,
        });

        setMessageReceiverUser({
          name: receiverUsername,
          profilePhoto: receiverProfilePhoto,
        });
      } else {
        if (role !== "seller") console.log("show modal to switch to seller");
        setMessageReceiverUser({
          name: senderUsername,
          profilePhoto: senderProfilePhoto,
        });

        setMessageSenderUser({
          name: receiverUsername,
          profilePhoto: receiverProfilePhoto,
        });
      }
    },
    onError: (err) => {},
    onSettled: (settledData, settledError) => {},
  });
};

export const useGetMessageById = (props: UseGetMessageByIdProps) => {
  const { id } = props;

  return useQueryWithSideEffects({
    queryKey: ["message", id],
    queryFn: () => getMessageById(id),
    // enabled: !!conversationId,
    onSuccess: (fetchedData) => {},
    onError: (err) => {},
    onSettled: (settledData, settledError) => {},
  });
};
