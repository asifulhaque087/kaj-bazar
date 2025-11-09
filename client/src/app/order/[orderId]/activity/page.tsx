"use client";

import BuyerReviewSellerModal from "@/features/review/components/buyer-review-seller-modal";
import DeliveryModal from "@/features/order/components/deliver-modal";
import SellerReviewBuyerModal from "@/features/review/components/seller-review-buyer-modal";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/use-auth.store";
import { CheckCircle2, Clock, FileText, Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetOrderById } from "@/features/order/queries/use-order.query";
import ActivityCard from "@/features/order/components/activity-card";
import DeliveredWorkComponent from "@/features/order/components/delivered-work";

const Activity = () => {
  const { orderId } = useParams<{ orderId: string }>();

  // ** --- states ---
  const [deliverModal, setDeliverModal] = useState(false);
  const [buyerReviewSellerModal, setBuyerReviewSellerModal] = useState(false);
  const [sellerReviewBuyerModal, setSellerReviewBuyerModal] = useState(false);

  // ** --- store ---
  const { authUser } = useAuthStore();

  // ** --- queries ---
  const { data: order, isLoading: isOrderLoading } = useGetOrderById(orderId);

  if (isOrderLoading || !authUser || !order) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading order details...
      </div>
    );
  }

  const isBuyer = authUser?.id === order?.buyer.id;

  // return (
  //   <>
  //     <Container className="pt-[24px]">
  //       <Welcome />
  //     </Container>
  //   </>
  // );

  return (
    <>
      {/* <Container className="pt-[24px]">
        <Welcome />
      </Container> */}

      <div className="bg-gray-100 dark:bg-gray-950 min-h-screen py-8">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50">
            Order Activity
          </h1>
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
                  <p className="text-sm italic text-gray-600 dark:text-gray-300">
                    {order.requirement}
                  </p>
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
                <Button
                  onClick={() => setDeliverModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md cursor-pointer"
                >
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
                      <Button
                        onClick={() => setBuyerReviewSellerModal(true)}
                        variant="outline"
                        className="mt-4"
                      >
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
                      <Button
                        onClick={() => setSellerReviewBuyerModal(true)}
                        variant="outline"
                        className="mt-4"
                      >
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
        <DeliveryModal
          orderId={orderId}
          showModal={deliverModal}
          setShowModal={setDeliverModal}
        />
        <BuyerReviewSellerModal
          order={order}
          showModal={buyerReviewSellerModal}
          setShowModal={setBuyerReviewSellerModal}
        />
        <SellerReviewBuyerModal
          order={order}
          showModal={sellerReviewBuyerModal}
          setShowModal={setSellerReviewBuyerModal}
        />
      </div>
    </>
  );
};

export default Activity;
