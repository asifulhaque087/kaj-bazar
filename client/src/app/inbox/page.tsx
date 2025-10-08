"use client";

import ConversationList from "@/features/chats/components/conversation-list";
import MessageList from "@/features/chats/components/message-list";
import Container from "@/components/container";
import { Conversation } from "@/schemas";
import { useAuthStore } from "@/store/use-auth.store";
import { useChatStore } from "@/store/use-chat.store";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetConversationsByUsername } from "@/features/chats/queries/use-user-covnersations.query";
import { useGetConversationsById } from "@/features/chats/queries/use-conversation.query";
import { useEffect } from "react";

const page = () => {
  const { authUser } = useAuthStore();
  const { setSelectedConversation } = useChatStore();

  const router = useRouter();

  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversation") || "";

  // const { setSelectedConversation } = useChatStore();

  const {
    data: allConversations,
    isLoading: allConversationsLoading,
    isError,
  } = useGetConversationsByUsername({
    authUser,
  });

  // console.log("conversation id is ================ ", conversationId);

  // const { data: conversation } = useGetConversationsById({ conversationId });
  useGetConversationsById({ conversationId });

  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, []);

  if (allConversationsLoading) return <div>loading conversatino list</div>;

  return (
    <Container className="mt-[40px]">
      <div className="grid grid-cols-12 gap-[16px]">
        <ConversationList
          conversations={allConversations}
          className="col-span-4"
        />
        {/* <MessageList className="col-span-8" conversation={conversation} /> */}
        <MessageList className="col-span-8" />
      </div>
    </Container>
  );

  return (
    <div>
      {allConversations?.map((con) => (
        <div
          key={con.id}
          onClick={() => {
            // setSelectedConversation(con);
            router.push(`/inbox/${con.id}?other=${findOtherUser(con)}`);
          }}
        >
          <h1>{con.senderUsername}</h1>
          <p>{con.messages[0]?.body}</p>
        </div>
      ))}
    </div>
  );

  function findOtherUser(con: Conversation): string {
    return authUser?.username === con.receiverUsername
      ? con.senderUsername
      : con.receiverUsername;
  }
};

export default page;
