// "use client";

// import { useGetMessageById } from "@/api/chats";
// import { useGetGigById } from "@/api/gigs";
// import { useCreateOrder } from "@/api/orders";
// import { useSellerByName } from "@/api/sellers";
// import { Button } from "@/components/ui/button";
// import { CreateOrderPayload } from "@/schemas";
// import { useAuthStore } from "@/store/use-auth.store";
// import { useParams } from "next/navigation";

// const page = () => {
//   const { messageId } = useParams<{ messageId: string }>();

//   // ** --- Store ---

//   const { authUser } = useAuthStore();

//   // ** --- Queries ---

//   const { data: message, isLoading } = useGetMessageById({ id: messageId });
//   const { data: gig, isLoading: isGigLoading } = useGetGigById({
//     id: message?.offer?.gigId!,
//   });

//   // ** --- Mutations ---

//   const { mutate: createOrder } = useCreateOrder();

//   // const { data: seller, isLoading:isSellerLoading } = useSellerByName({});

//   console.log("the message is", message);
//   console.log("the gig is", gig);
//   // console.log("the seller is", gig?.username, gig?.email, gig?.profilePicture, gig.);

//   return (
//     <div>
//       this is checkout page - {messageId}
//       <Button onClick={submitOrder}>Confirm & Pay</Button>
//     </div>
//   );

//   function submitOrder() {
//     // prepare data

//     const orderData: CreateOrderPayload = {
//       // buyer: authUser,

//       buyer: {
//         id: authUser?.id!,
//         username: authUser?.username!,
//         email: authUser?.email!,
//         profilePicture: authUser?.profilePicture!,
//       },
//       // gig: gig,
//       gig: {
//         id: gig?.id!,
//         title: gig?.title!,
//         basicTitle: gig?.basicTitle!,
//         description: gig?.description!,
//         basicDescription: gig?.basicDescription!,
//         coverImage: gig?.coverImage!,
//       },
//       messageId: messageId,
//       price: gig?.price!,
//       seller: {
//         id: gig?.sellerId!,
//         username: gig?.username!,
//         email: gig?.email!,
//         profilePicture: gig?.profilePicture!,
//       },
//       // deliveryDueDate: message?.offer?.deliveryInDays!,
//       deliveryInDays: 2,
//       paymentIntent: "stripe_secret",
//     };

//     createOrder(orderData);
//   }
// };

// export default page;



// ================  new design

"use client";

import { useGetMessageById } from "@/api/chats";
import { useGetGigById } from "@/api/gigs";
import { useCreateOrder } from "@/api/orders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
import { CreateOrderPayload } from "@/schemas";
import { useAuthStore } from "@/store/use-auth.store";
import { Loader2, Lock } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const Page = () => {
  const { messageId } = useParams<{ messageId: string }>();
  const router = useRouter();
  const { authUser } = useAuthStore();

  const { data: message, isLoading: isMessageLoading } = useGetMessageById({ id: messageId });
  const { data: gig, isLoading: isGigLoading } = useGetGigById({
    id: message?.offer?.gigId,
  });
  const { mutate: createOrder, isLoading: isCreatingOrder } = useCreateOrder();

  if (isMessageLoading || isGigLoading || !message || !gig || !authUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        Loading checkout details...
      </div>
    );
  }

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-2xl shadow-lg dark:bg-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-50">Confirm & Pay</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Review your order before completing the payment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Order Summary */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative w-32 h-24 sm:w-40 sm:h-32 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={gig.coverImage}
                alt={gig.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">{gig.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Offered by <span className="font-medium text-blue-600 dark:text-blue-400">{gig.username}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 italic">"{message.offer?.description}"</p>
            </div>
          </div>
          {/* <Separator className="bg-gray-200 dark:bg-gray-700" /> */}
          {/* Pricing Details */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
              <span className="font-medium">Price</span>
              <span>${message.offer?.price}</span>
            </div>
            <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
              <span className="font-medium">Delivery Time</span>
              <span>{message.offer?.deliveryInDays} days</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold text-gray-900 dark:text-gray-50 pt-2 border-t border-dashed border-gray-300 dark:border-gray-600">
              <span>Total</span>
              <span>${message.offer?.price}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={submitOrder}
            className="w-full h-12 text-lg font-semibold bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 transition-colors"
            disabled={isCreatingOrder}
          >
            {isCreatingOrder ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm & Pay"
            )}
          </Button>
          <p className="text-xs text-center text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1">
            <Lock className="h-3 w-3" />
            Secure payment powered by Stripe.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
