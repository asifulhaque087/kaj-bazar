"use client";

import { Suspense } from "react";
import ConversationList from "@/features/chat/components/conversation-list";
import MessageList from "@/features/chat/components/message-list";
import Container from "@/components/container";
import { useAuthStore } from "@/store/use-auth.store";
import { useChatStore } from "@/store/use-chat.store";
import { useSearchParams } from "next/navigation";
import { useGetConversationsByUsername } from "@/features/chat/queries/use-user-covnersations.query";
import { useGetConversationsById } from "@/features/chat/queries/use-conversation.query";
import { useEffect } from "react";
import { useBuyerOrdersQuery } from "@/features/order/queries/use-buyer-orders.query";

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

  useBuyerOrdersQuery({ buyerId: authUser?.id });

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, []);

  if (allConversationsLoading) return <div>Loading conversation list...</div>;

  return (
    <Container className="py-[80px]">
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
