import { getConversationsById } from "@/features/chats/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { useAuthStore } from "@/store/use-auth.store";
import { useChatStore } from "@/store/use-chat.store";

export interface UseGetConversationsByIdProps {
  conversationId: string;
}

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
