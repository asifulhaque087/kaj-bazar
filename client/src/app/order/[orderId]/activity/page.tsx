// "use client";

// import { useApproveDelivery, useGetOrderById } from "@/api/orders";
// import { useBuyerReviewSeller, useSellerReviewBuyer } from "@/api/reviews";
// import BuyerReviewSellerModal from "@/components/buyer-review-seller-modal";
// import DeliveryModal from "@/components/deliver-modal";
// import SellerReviewBuyerModal from "@/components/seller-review-buyer-modal";
// import { Button } from "@/components/ui/button";
// import { BuyerReviewSellerPayload, DeliveredWork, Order } from "@/schemas";
// import { useAuthStore } from "@/store/use-auth.store";
// import { useParams } from "next/navigation";
// import { useState } from "react";

// const page = () => {
//   const { orderId } = useParams<{ orderId: string }>();

//   // ** --- States ---
//   const [deliverModal, setDeliverModal] = useState(false);
//   const [buyerReviewSellerModal, setBuyerReviewSellerModal] = useState(false);
//   const [sellerReviewBuyerModal, setSellerReviewBuyerModal] = useState(false);

//   // ** --- store ---
//   const { authUser } = useAuthStore();

//   // ** --- Mutations ---
//   const { mutate: sellerReviewBuyer } = useSellerReviewBuyer();
//   const { mutate: buyerReviewSeller } = useBuyerReviewSeller();

//   // ** --- Queries ---
//   const { data: order, isLoading: isOrderLoading } = useGetOrderById(orderId);

//   if (isOrderLoading || !authUser) return;

//   // console.log("order from activity is ", order);
//   const isBuyer = authUser?.id === order?.buyer.id;

//   // useE

//   console.log("isbuyer is ", authUser, order, isBuyer);

//   return (
//     <div>
//       {!isBuyer && (
//         <div>
//           <Button onClick={() => setDeliverModal(true)}>deliver order</Button>

//           <DeliveryModal
//             orderId={orderId}
//             showModal={deliverModal}
//             setShowModal={setDeliverModal}
//           />
//         </div>
//       )}
//       {/* place order */}
//       <div>
//         {" "}
//         {isBuyer ? "You" : order?.buyer.username} Placed the order at:{" "}
//         {order?.placeOrderAt}
//       </div>
//       {/* {isBuyer ? (
//           <div>You Placed the order at: {order?.placeOrderAt}</div>
//         ) : (
//           <div>
//             {order?.buyer.username} Placed the order at: {order?.placeOrderAt}
//           </div>
//         )} */}
//       {/* requirements */}
//       {!!order?.requirement && (
//         <div>
//           <div>
//             {isBuyer ? "You" : order?.buyer.username} submitted the requireemtns
//             at: {order?.placeOrderAt}
//           </div>
//           <div>{order?.requirement}</div>
//         </div>
//       )}
//       {/* order started */}
//       <div>
//         {" "}
//         {isBuyer ? "Your" : "The"} order started at: {order?.placeOrderAt}
//       </div>
//       {/* due date */}
//       The delivery due date is {order?.deliveryDueDate}
//       {/* extension request*/}
//       {/* delivered works */}
//       {!!order?.deliveredWorks && <Works order={order} isBuyer={isBuyer} />}
//       {/* {!!order?.deliveredWorks } */}
//       {/* reviews */}
//       {order?.accepted && (
//         <>
//           {isBuyer && !order.sellerReceivedReview && (
//             <div>
//               <h1>ready to reveiw the seller</h1>
//               <Button onClick={() => setBuyerReviewSellerModal(true)}>
//                 Review
//               </Button>

//               <BuyerReviewSellerModal
//                 order={order}
//                 setShowModal={setBuyerReviewSellerModal}
//                 showModal={buyerReviewSellerModal}
//               />
//             </div>
//           )}

//           {isBuyer && order.sellerReceivedReview && (
//             <div>
//               <h1>You reviewed {order.seller.username}</h1>
//               <div>reviews...</div>
//             </div>
//           )}

//           {!isBuyer && order.sellerReceivedReview && (
//             <div>
//               <h1>{order.buyer.username} reviewed You</h1>
//               <div>reviews...</div>
//             </div>
//           )}

//           {/* seller */}

//           {!isBuyer && !order.buyerReceivedReview && (
//             <div>
//               <h1>ready to reveiw the buyer</h1>
//               <Button onClick={() => setSellerReviewBuyerModal(true)}>
//                 Review
//               </Button>

//               <SellerReviewBuyerModal
//                 order={order}
//                 setShowModal={setSellerReviewBuyerModal}
//                 showModal={sellerReviewBuyerModal}
//               />
//             </div>
//           )}

//           {!isBuyer && order.buyerReceivedReview && (
//             <div>
//               <h1>You reviewed {order.buyer.username}</h1>
//               <div>reviews...</div>
//             </div>
//           )}

//           {isBuyer && order.buyerReceivedReview && (
//             <div>
//               <h1>{order.seller.username} reviewed You</h1>
//               <div>reviews...</div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default page;

// interface WorksProps {
//   order: Order;
//   isBuyer: boolean;
// }

// const Works = (props: WorksProps) => {
//   const { order, isBuyer } = props;

//   // ** --- Mutations ----

//   const { mutate: approveDeliver } = useApproveDelivery();

//   return (
//     <div>
//       {isBuyer ? (
//         <div>
//           {order.seller.username} Delivered your order at: {order?.placeOrderAt}
//         </div>
//       ) : (
//         <div>You delivered the order at: {order?.placeOrderAt}</div>
//       )}

//       <div>
//         {order.deliveredWorks?.map((work, i) => (
//           <div key={i}>file {i}</div>
//         ))}
//       </div>

//       {!order.accepted && isBuyer && (
//         <div>
//           <h1 className="text-[18px] font-bold">
//             Are you ready to approve the delivery ?
//           </h1>
//           <p>If you have issue contact the seller in the inbox</p>
//           <Button
//             className="bg-green-400 text-white"
//             onClick={() => approveDeliver(order.id)}
//           >
//             Yes, approve the delivery
//           </Button>
//         </div>
//       )}

//       {!order.accepted && !isBuyer && (
//         <h1 className="text-[18px] font-bold">
//           Waiting for order to be approved
//         </h1>
//       )}

//       {order.accepted && isBuyer && (
//         <h1 className="text-[18px] font-bold">Your order was completed</h1>
//       )}

//       {order.accepted && !isBuyer && (
//         <h1 className="text-[18px] font-bold">The order was completed</h1>
//       )}
//     </div>
//   );
// };


// =============== new design


"use client";

import { useApproveDelivery, useGetOrderById } from "@/api/orders";
import { useBuyerReviewSeller, useSellerReviewBuyer } from "@/api/reviews";
import BuyerReviewSellerModal from "@/components/buyer-review-seller-modal";
import DeliveryModal from "@/components/deliver-modal";
import SellerReviewBuyerModal from "@/components/seller-review-buyer-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
import { DeliveredWork, Order } from "@/schemas";
import { useAuthStore } from "@/store/use-auth.store";
import { CheckCircle2, Clock, FileText, Package, Star, MessageSquare } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

const Page = () => {
  const { orderId } = useParams<{ orderId: string }>();

  // ** --- States ---
  const [deliverModal, setDeliverModal] = useState(false);
  const [buyerReviewSellerModal, setBuyerReviewSellerModal] = useState(false);
  const [sellerReviewBuyerModal, setSellerReviewBuyerModal] = useState(false);

  // ** --- store ---
  const { authUser } = useAuthStore();

  // ** --- Queries ---
  const { data: order, isLoading: isOrderLoading } = useGetOrderById(orderId);

  if (isOrderLoading || !authUser || !order) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading order details...
      </div>
    );
  }

  const isBuyer = authUser?.id === order?.buyer.id;

  return (
    <div className="bg-gray-100 dark:bg-gray-950 min-h-screen py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50">Order Activity</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          A timeline of all events related to your order.
        </p>

        <div className="space-y-6">
          {/* Order Placed */}
          <ActivityCard
            icon={<CheckCircle2 className="text-green-500" />}
            title="Order Placed"
            timestamp={order.placeOrderAt}
            description={
              isBuyer
                ? `You placed this order with ${order.seller.username}.`
                : `${order.buyer.username} placed this order with you.`
            }
          />

          {/* Requirements Submitted */}
          {order.requirement && (
            <ActivityCard
              icon={<FileText className="text-blue-500" />}
              title="Requirements Submitted"
              timestamp={order.placeOrderAt}
              description={
                isBuyer
                  ? `You submitted the requirements. Ready for ${order.seller.username} to start.`
                  : `Your buyer ${order.buyer.username} submitted the requirements.`
              }
            >
              <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                <p className="text-sm italic text-gray-600 dark:text-gray-300">{order.requirement}</p>
              </div>
            </ActivityCard>
          )}

          {/* Due Date */}
          <ActivityCard
            icon={<Clock className="text-purple-500" />}
            title="Due Date"
            timestamp={order.deliveryDueDate}
            description={`The delivery is due by this date.`}
          />
          
          {/* Deliver Work Button (Seller) */}
          {!isBuyer && !order.accepted && (
            <div className="flex justify-center my-8">
              <Button onClick={() => setDeliverModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md">
                Deliver Order
              </Button>
            </div>
          )}

          {/* Delivered Work */}
          {order.deliveredWorks && (
            <DeliveredWorkComponent order={order} isBuyer={isBuyer} />
          )}

          {/* Reviews Section */}
          {order.accepted && (
            <div className="space-y-6">
              {/* <Separator className="my-8 bg-gray-300 dark:bg-gray-700" /> */}
              <ActivityCard
                icon={<Star className="text-yellow-500" />}
                title="Order Completed"
                description="This order has been successfully completed and approved."
              />
              
              {/* Buyer Review */}
              {isBuyer && !order.sellerReceivedReview && (
                <ActivityCard
                  icon={<Star className="text-yellow-500" />}
                  title="Review Seller"
                  description="Share your experience and review the seller's work."
                  action={
                    <Button onClick={() => setBuyerReviewSellerModal(true)} variant="outline" className="mt-4">
                      Write a Review
                    </Button>
                  }
                />
              )}
              {isBuyer && order.sellerReceivedReview && (
                <ActivityCard
                  icon={<Star className="text-yellow-500" />}
                  title={`You Reviewed ${order.seller.username}`}
                  description="Your feedback has been submitted."
                />
              )}
              
              {/* Seller Review */}
              {!isBuyer && !order.buyerReceivedReview && (
                <ActivityCard
                  icon={<Star className="text-yellow-500" />}
                  title="Review Buyer"
                  description="Review the buyer and help the community."
                  action={
                    <Button onClick={() => setSellerReviewBuyerModal(true)} variant="outline" className="mt-4">
                      Write a Review
                    </Button>
                  }
                />
              )}
              {!isBuyer && order.buyerReceivedReview && (
                <ActivityCard
                  icon={<Star className="text-yellow-500" />}
                  title={`You Reviewed ${order.buyer.username}`}
                  description="Your feedback has been submitted."
                />
              )}
              
              {/* Show the other person's review if it exists */}
              {!isBuyer && order.sellerReceivedReview && (
                <ActivityCard
                  icon={<Star className="text-yellow-500" />}
                  title={`${order.buyer.username} Reviewed You`}
                  description="You can view the review on your profile."
                />
              )}
              {isBuyer && order.buyerReceivedReview && (
                <ActivityCard
                  icon={<Star className="text-yellow-500" />}
                  title={`${order.seller.username} Reviewed You`}
                  description="You can view the review on their profile."
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <DeliveryModal orderId={orderId} showModal={deliverModal} setShowModal={setDeliverModal} />
      <BuyerReviewSellerModal order={order} showModal={buyerReviewSellerModal} setShowModal={setBuyerReviewSellerModal} />
      <SellerReviewBuyerModal order={order} showModal={sellerReviewBuyerModal} setShowModal={setSellerReviewBuyerModal} />
    </div>
  );
};

export default Page;

// ** --- Component Props ---
interface ActivityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  timestamp?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

const ActivityCard = ({ icon, title, description, timestamp, action, children }: ActivityCardProps) => {
  const formattedTime = timestamp ? new Date(timestamp).toLocaleString() : '';
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
          {icon}
        </div>
        <div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </CardDescription>
        </div>
        {timestamp && (
          <div className="ml-auto text-sm text-gray-400 dark:text-gray-500 flex-shrink-0">
            {formattedTime}
          </div>
        )}
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
      {action && <CardFooter>{action}</CardFooter>}
    </Card>
  );
};

interface DeliveredWorkProps {
  order: Order;
  isBuyer: boolean;
}

const DeliveredWorkComponent = ({ order, isBuyer }: DeliveredWorkProps) => {
  const { mutate: approveDeliver } = useApproveDelivery();
  
  if (!order.deliveredWorks) return null;

  const lastDelivery = order.deliveredWorks[order.deliveredWorks.length - 1];

  return (
    <div className="space-y-6">
      <ActivityCard
        icon={<Package className="text-green-500" />}
        title="Order Delivered"
        timestamp={lastDelivery.deliveredAt}
        description={
          isBuyer
            ? `${order.seller.username} has delivered the work.`
            : `You have delivered the order.`
        }
      >
        <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
          {lastDelivery.file && (
            <p className="text-sm mb-2 font-medium">
              File: <a href={lastDelivery.file} className="text-blue-500 hover:underline">Download</a>
            </p>
          )}
          {lastDelivery.message && (
            <p className="text-sm italic text-gray-600 dark:text-gray-300">"{lastDelivery.message}"</p>
          )}
        </div>
        
        {!order.accepted && (
          <div className="mt-4 p-4 border-t border-dashed border-gray-300 dark:border-gray-600">
            {isBuyer ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                    Ready to Approve?
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    If you're happy with the delivery, you can approve it to complete the order.
                  </p>
                </div>
                <Button
                  onClick={() => approveDeliver(order.id)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  Yes, Approve Delivery
                </Button>
              </div>
            ) : (
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Waiting for buyer approval...
              </h3>
            )}
          </div>
        )}
      </ActivityCard>
    </div>
  );
};

