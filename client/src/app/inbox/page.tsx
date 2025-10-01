"use client";

import { useGetConversationsByUsername } from "@/api/chats";
import ConversationList from "@/app/inbox/conversation-list";
import MessageList from "@/app/inbox/message-list";
import Container from "@/components/container";
import { Conversation } from "@/schemas";
import { useAuthStore } from "@/store/use-auth.store";
import { useChatStore } from "@/store/use-chat.store";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const { authUser } = useAuthStore();

  const router = useRouter();

  // const { setSelectedConversation } = useChatStore();

  const { data, isLoading, isError } = useGetConversationsByUsername({
    authUser,
  });

  if (isLoading) return <div>loading conversatino list</div>;

  return (
    <Container className="mt-[40px]">
      <div className="grid grid-cols-12 gap-[16px]">
        <ConversationList conversations={data} className="col-span-4" />
        <MessageList className="col-span-8" />
      </div>
    </Container>
  );

  return (
    <div>
      {data?.map((con) => (
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
