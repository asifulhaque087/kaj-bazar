// "use client";

// import ConversationList from "@/features/chats/components/conversation-list";
// import MessageList from "@/features/chats/components/message-list";
// import Container from "@/components/container";
// import { Conversation } from "@/schemas";
// import { useAuthStore } from "@/store/use-auth.store";
// import { useChatStore } from "@/store/use-chat.store";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useGetConversationsByUsername } from "@/features/chats/queries/use-user-covnersations.query";
// import { useGetConversationsById } from "@/features/chats/queries/use-conversation.query";
// import { useEffect } from "react";

// const Page = () => {
//   const { authUser } = useAuthStore();
//   const { setSelectedConversation } = useChatStore();

//   const searchParams = useSearchParams();
//   const conversationId = searchParams.get("conversation") || "";

//   const { data: allConversations, isLoading: allConversationsLoading } =
//     useGetConversationsByUsername({
//       authUser,
//     });

//   useGetConversationsById({ conversationId });

//   useEffect(() => {
//     return () => {
//       setSelectedConversation(null);
//     };
//   }, []);

//   if (allConversationsLoading) return <div>loading conversatino list</div>;

//   return (
//     <Container className="mt-[40px]">
//       <div className="grid grid-cols-12 gap-[16px]">
//         <ConversationList
//           conversations={allConversations}
//           className="col-span-4"
//         />
//         <MessageList className="col-span-8" />
//       </div>
//     </Container>
//   );
// };

// export default Page;


// ======================= New ========================

"use client";

import { Suspense } from "react";
import ConversationList from "@/features/chats/components/conversation-list";
import MessageList from "@/features/chats/components/message-list";
import Container from "@/components/container";
import { Conversation } from "@/schemas";
import { useAuthStore } from "@/store/use-auth.store";
import { useChatStore } from "@/store/use-chat.store";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetConversationsByUsername } from "@/features/chats/queries/use-user-covnersations.query";
import { useGetConversationsById } from "@/features/chats/queries/use-conversation.query";
import { useEffect } from "react";

// --- The main page (adds Suspense boundary)
export default function Page() {
  return (
    <Suspense fallback={<div>Loading inbox...</div>}>
      <InboxPageContent />
    </Suspense>
  );
}

// --- Component that actually uses useSearchParams
function InboxPageContent() {
  const { authUser } = useAuthStore();
  const { setSelectedConversation } = useChatStore();

  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversation") || "";

  const { data: allConversations, isLoading: allConversationsLoading } =
    useGetConversationsByUsername({ authUser });

  useGetConversationsById({ conversationId });

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, []);

  if (allConversationsLoading) return <div>Loading conversation list...</div>;

  return (
    <Container className="mt-[40px]">
      <div className="grid grid-cols-12 gap-[16px]">
        <ConversationList
          conversations={allConversations}
          className="col-span-4"
        />
        <MessageList className="col-span-8" />
      </div>
    </Container>
  );
}
