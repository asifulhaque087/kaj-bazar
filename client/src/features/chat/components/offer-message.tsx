import { MessageOffer } from "@/features/chat/schemas/chat.schema";
import { useBuyerOrdersQuery } from "@/features/order/queries/use-buyer-orders.query";
import { useSellerOrdersQuery } from "@/features/order/queries/use-seller-orders.query";
import { useAuthStore } from "@/store/use-auth.store";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  reverse?: boolean;
  offer: MessageOffer;
  messageId: string;
}

const OfferMessage = (props: Props) => {
  const { reverse, offer, messageId } = props;

  const router = useRouter();

  const { authUser } = useAuthStore();

  const { data: buyerOrders = [] } = useBuyerOrdersQuery({
    buyerId: authUser?.id,
  });
  const { data: sellerOrders = [] } = useSellerOrdersQuery({
    sellerId: authUser?.id,
  });

  // const orderId = [...(buyerOrders ?? []), ...(sellerOrders ?? [])]?.find(
  //   (order) => order.messageId === messageId
  // )?.id;

  // console.log(" buyers Orders ", buyerOrders);
  // console.log(" seller Orders ", sellerOrders);

  const orderId = [...buyerOrders, ...sellerOrders]?.find(
    (order) => order.messageId === messageId
  )?.id;

  return (
    <div
      className={`rounded-[8px] ${
        reverse ? "rounded-br-none" : "rounded-bl-none"
      } p-[12px] bg-[#F7F7FA]`}
    >
      <h4 className="font-roboto font-medium text-[16px] text-[#0E0F19] text-center">
        {/* $30 */}${offer?.price}
      </h4>
      <p className="font-roboto font-normal text-[14px] text-[#0E0F19] text-center mt-[8px]">
        {/* I will develop react application for you */}
        {offer?.gigTitle}
      </p>

      <div className="mt-[12px] p-[12px] rounded-[4px] bg-[#FEFEFF] font-roboto font-normal text-[12px] text-[#0E0F19] leading-[1.6]">
        {/* It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its */}
        {offer?.description}
      </div>

      {!offer.accepted && (
        <div className="mt-[12px] flex gap-x-[16px] justify-end">
          <button
            className="border-none outline-none rounded-[4px] bg-[#9FBB89] px-[16px] py-[8px] font-roboto text-[#3E3F47] font-normal text-[12px] cursor-pointer"
            onClick={() => router.push(`/checkout/${messageId}`)}
          >
            Accept
          </button>

          <button className="border-none outline-none rounded-[4px] bg-[#FF6666] px-[16px] py-[8px] font-roboto text-[#3E3F47] font-normal text-[12px] cursor-pointer">
            Reject
          </button>
        </div>
      )}

      {offer.accepted && (
        <div className="mt-[12px] flex gap-x-[16px] justify-end">
          <button
            className="border-none outline-none rounded-[4px] bg-gray-300 px-[16px] py-[8px] font-roboto text-[#3E3F47] font-normal text-[12px]"
            // onClick={() => router.push(`/checkout/${messageId}`)}
          >
            Accepted
          </button>

          <button
            className="border-none outline-none rounded-[4px] bg-[#9FBB89] px-[16px] py-[8px] font-roboto text-[#3E3F47] font-normal text-[12px] underline cursor-pointer capitalize"
            onClick={() => router.push(`/order/${orderId}/activity`)}
          >
            view order
          </button>
        </div>
      )}
    </div>
  );
};

export default OfferMessage;
