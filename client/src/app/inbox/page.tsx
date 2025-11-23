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
import { useSellerOrdersQuery } from "@/features/order/queries/use-seller-orders.query";
import { MessageSquareMore } from "lucide-react";
import { Card } from "@/components/ui/card";

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
  // ** --- store ---
  const { authUser } = useAuthStore();
  const { setSelectedConversation, messages, selectedConversation } =
    useChatStore();

  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversation") || "";

  const { data: allConversations, isLoading: allConversationsLoading } =
    useGetConversationsByUsername({ authUser });

  useGetConversationsById({ conversationId });

  useBuyerOrdersQuery({ buyerId: authUser?.id });
  useSellerOrdersQuery({ sellerId: authUser?.id });

  // useEffect(() => {
  //   return () => setSelectedConversation(null);
  // }, []);

  if (allConversationsLoading) return <div>Loading conversation list...</div>;

  return (
    <Container className="py-[80px]">
      <div className="grid grid-cols-12 gap-[16px]">
        <ConversationList
          conversations={allConversations}
          className="col-span-4"
        />
        {!!selectedConversation && <MessageList className="col-span-8" />}

        {/* if not messages */}
        {!selectedConversation && (
          <Card className="col-span-8 grid place-items-center">
            <div className="bg-[#F7F7FA] rounded-[8px] w-full max-w-[345px] flex items-center justify-center flex-col gap-y-[20px] px-[24px] py-[48px]">
              <div className="bg-[#616BA4] rounded-[4px] px-[22px] py-[18px]">
                <MessageSquareMore className="text-[#F7F7FA] w-[32px] h-[32px]" />
              </div>

              <h1 className="font-roboto font-normal text-[24px] text-[#0E0F19] text-center">
                Welcome To KajBazar
              </h1>

              <p className="font-roboto font-normal text-[14px] text-[#3E3F47] text-center">
                Select a conversation from the sidebar to start Chatting
              </p>
            </div>
          </Card>
        )}
      </div>
    </Container>
  );
}
