"use client";

import { useGetConversationsByUsername } from "@/api/chats";
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
    <div>
      {data?.map((con) => (
        // <Link
        //   href={`/inbox/${con.id}?other=${findOtherUser(con)}`}
        //   key={con.id}
        // >
        <div
          key={con.id}
          onClick={() => {
            // setSelectedConversation(con);
            router.push(`/inbox/${con.id}?other=${findOtherUser(con)}`);
          }}
        >
          <h1>{con.senderUsername}</h1>
          <p>{con.messages[0].body}</p>
        </div>
        // </Link>
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
