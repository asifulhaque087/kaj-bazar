import CustomDropdown from "@/components/widgets/header/dropdown";
import { useChatStore } from "@/store/use-chat.store";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const UnreadMessageDropdown = () => {
  const { unreadMessages, setUnreadMessages } = useChatStore();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setUnreadMessages([]);
    }
  };

  const trigger = (
    <div className="relative cursor-pointer">
      <MessageSquare
        strokeWidth={1}
        className="w-[20px] h-[20px] text-[#FEFEFF]"
      />

      {!!unreadMessages.length && (
        <span className="absolute -top-[12px] -right-[12px] w-[16px] h-[16px] rounded-full bg-red-500 text-[12px] grid place-items-center text-[#FEFEFF]">
          {unreadMessages.length}
        </span>
      )}
    </div>
  );

  const content = (
    <div className="w-full flex flex-col gap-y-[16px] p-[16px]">
      {unreadMessages.length === 0 && (
        <span className="font-roboto font-normal text-[14px] text-[#0E0F19]">
          No unread message found
        </span>
      )}

      {unreadMessages.map((unmsg) => (
        <Link
          href={`/inbox?conversation=${unmsg.conversationId}`}
          key={unmsg.id}
        >
          <span className="font-roboto font-normal text-[14px] text-[#0E0F19]">
            {unmsg.senderUsername} send you
            {unreadMessages.length === 1 ? " a message" : " messages"}
          </span>
        </Link>
      ))}
    </div>
  );

  return (
    <CustomDropdown
      contentClassName="rounded-[4px] bg-[#FEFEFF] min-w-[220px]"
      trigger={trigger}
      content={content}
      align="end"
      onOpenChange={handleOpenChange}
    />
  );
};

export default UnreadMessageDropdown;
