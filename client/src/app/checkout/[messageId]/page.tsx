"use client";

import { useGetMessageById } from "@/api/chats";
import { useGetGigById } from "@/api/gigs";
import { useCreateOrder } from "@/api/orders";
import { useSellerByName } from "@/api/sellers";
import { Button } from "@/components/ui/button";
import { CreateOrderPayload } from "@/schemas";
import { useAuthStore } from "@/store/use-auth.store";
import { useParams } from "next/navigation";

const page = () => {
  const { messageId } = useParams<{ messageId: string }>();

  // ** --- Store ---

  const { authUser } = useAuthStore();

  // ** --- Queries ---

  const { data: message, isLoading } = useGetMessageById({ id: messageId });
  const { data: gig, isLoading: isGigLoading } = useGetGigById({
    id: message?.offer?.gigId!,
  });

  // ** --- Mutations ---

  const { mutate: createOrder } = useCreateOrder();

  // const { data: seller, isLoading:isSellerLoading } = useSellerByName({});

  console.log("the message is", message);
  console.log("the gig is", gig);
  // console.log("the seller is", gig?.username, gig?.email, gig?.profilePicture, gig.);

  return (
    <div>
      this is checkout page - {messageId}
      <Button onClick={submitOrder}>Confirm & Pay</Button>
    </div>
  );

  function submitOrder() {
    // prepare data

    const orderData: CreateOrderPayload = {
      // buyer: authUser,

      buyer: {
        id: authUser?.id!,
        username: authUser?.username!,
        email: authUser?.email!,
        profilePicture: authUser?.profilePicture!,
      },
      // gig: gig,
      gig: {
        id: gig?.id!,
        title: gig?.title!,
        basicTitle: gig?.basicTitle!,
        description: gig?.description!,
        basicDescription: gig?.basicDescription!,
        coverImage: gig?.coverImage!,
      },
      messageId: messageId,
      price: gig?.price!,
      seller: {
        id: gig?.sellerId!,
        username: gig?.username!,
        email: gig?.email!,
        profilePicture: gig?.profilePicture!,
      },
      // deliveryDueDate: message?.offer?.deliveryInDays!,
      deliveryInDays: 2,
      paymentIntent: "stripe_secret",
    };

    createOrder(orderData);
  }
};

export default page;
