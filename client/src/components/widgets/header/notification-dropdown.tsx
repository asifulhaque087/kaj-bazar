"use client";

import CustomDropdown from "@/components/widgets/header/dropdown";
import { useChatStore } from "@/store/use-chat.store";
import { BellRing } from "lucide-react";
import Link from "next/link";

const NotificationDropdown = () => {
  const { notifications, setNotificationEmpty } = useChatStore();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setNotificationEmpty();
    }
  };

  const trigger = (
    <div className="relative cursor-pointer">
      <BellRing strokeWidth={1} className="w-[20px] h-[20px] text-[#FEFEFF]" />

      {!!notifications.length && (
        <span className="absolute -top-[12px] -right-[12px] w-[16px] h-[16px] rounded-full bg-red-500 text-[12px] grid place-items-center text-[#FEFEFF]">
          {notifications.length}
        </span>
      )}
    </div>
  );

  const content = (
    <div className="w-full flex flex-col gap-y-[16px] p-[16px]">
      {notifications.length === 0 && (
        <span className="font-roboto font-normal text-[14px] text-[#0E0F19]">
          No Notification Found
        </span>
      )}

      {notifications.map((not, i) => (
        <Link href={`/order/${not.order.id}/activity`} key={i}>
          {not.type === "start order" && (
            <p className="font-roboto font-normal text-[14px] text-[#0E0F19]">
              <span className="font-bold">{not.order.buyer.username}</span>{" "}
              placed an order for your gig
            </p>
          )}

          {not.type === "deliver order" && (
            <p className="font-roboto font-normal text-[14px] text-[#0E0F19]">
              <span className="font-bold">{not.order.seller.username}</span>{" "}
              delivered your order
            </p>
          )}

          {not.type === "approve order" && (
            <p className="font-roboto font-normal text-[14px] text-[#0E0F19]">
              <span className="font-bold">{not.order.buyer.username}</span>{" "}
              approved your delivery 🎉
            </p>
          )}

          {not.type === "buyer received review" && (
            <p className="font-roboto font-normal text-[14px] text-[#0E0F19]">
              <span className="font-bold">{not.order.seller.username}</span>{" "}
              reviewed you
            </p>
          )}

          {not.type === "seller received review" && (
            <p className="font-roboto font-normal text-[14px] text-[#0E0F19]">
              <span className="font-bold">{not.order.buyer.username}</span>{" "}
              reviewed you
            </p>
          )}
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

export default NotificationDropdown;
