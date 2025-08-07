"use client";

import { useApproveDelivery, useGetOrderById } from "@/api/orders";
import DeliveryModal from "@/components/deliver-modal";
import { Button } from "@/components/ui/button";
import { DeliveredWork, Order } from "@/schemas";
import { useAuthStore } from "@/store/use-auth.store";
import { useParams } from "next/navigation";
import { useState } from "react";

const page = () => {
  const { orderId } = useParams<{ orderId: string }>();

  // ** --- States ---

  const [deliverModal, setDeliverModal] = useState(false);

  // ** --- store ---
  const { authUser } = useAuthStore();

  const { data: order, isLoading: isOrderLoading } = useGetOrderById(orderId);

  if (isOrderLoading || !authUser) return;

  // console.log("order from activity is ", order);
  const isBuyer = authUser?.id === order?.buyer.id;

  // useE

  console.log("isbuyer is ", authUser, order, isBuyer);

  return (
    <div>
      {!isBuyer && (
        <div>
          <Button onClick={() => setDeliverModal(true)}>deliver order</Button>

          <DeliveryModal
            orderId={orderId}
            showModal={deliverModal}
            setShowModal={setDeliverModal}
          />
        </div>
      )}
      {/* place order */}
      <div>
        {" "}
        {isBuyer ? "You" : order?.buyer.username} Placed the order at:{" "}
        {order?.placeOrderAt}
      </div>
      {/* {isBuyer ? (
          <div>You Placed the order at: {order?.placeOrderAt}</div>
        ) : (
          <div>
            {order?.buyer.username} Placed the order at: {order?.placeOrderAt}
          </div>
        )} */}
      {/* requirements */}
      {!!order?.requirement && (
        <div>
          <div>
            {isBuyer ? "You" : order?.buyer.username} submitted the requireemtns
            at: {order?.placeOrderAt}
          </div>
          <div>{order?.requirement}</div>
        </div>
      )}
      {/* order started */}
      <div>
        {" "}
        {isBuyer ? "Your" : "The"} order started at: {order?.placeOrderAt}
      </div>
      {/* due date */}
      The delivery due date is {order?.deliveryDueDate}
      {/* extension request*/}
      {/* delivered works */}
      {!!order?.deliveredWorks && <Works order={order} isBuyer={isBuyer} />}
      {/* {!!order?.deliveredWorks } */}
      {/* reviews */}
      {order?.accepted && (
        <>
          {isBuyer && !order.sellerReceivedReview && (
            <div>
              <h1>ready to reveiw the seller</h1>
              <Button>Review</Button>
            </div>
          )}

          {isBuyer && order.sellerReceivedReview && (
            <div>
              <h1>You reviewed {order.seller.username}</h1>
              <div>reviews...</div>
            </div>
          )}

          {!isBuyer && order.sellerReceivedReview && (
            <div>
              <h1>{order.buyer.username} reviewed You</h1>
              <div>reviews...</div>
            </div>
          )}

          {/* seller */}

          {!isBuyer && !order.buyerReceivedReview && (
            <div>
              <h1>ready to reveiw the buyer</h1>
              <Button>Review</Button>
            </div>
          )}

          {!isBuyer && order.buyerReceivedReview && (
            <div>
              <h1>You reviewed {order.buyer.username}</h1>
              <div>reviews...</div>
            </div>
          )}

          {isBuyer && order.buyerReceivedReview && (
            <div>
              <h1>{order.seller.username} reviewed You</h1>
              <div>reviews...</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default page;

interface WorksProps {
  order: Order;
  isBuyer: boolean;
}

const Works = (props: WorksProps) => {
  const { order, isBuyer } = props;

  // ** --- Mutations ----

  const { mutate: approveDeliver } = useApproveDelivery();

  return (
    <div>
      {isBuyer ? (
        <div>
          {order.seller.username} Delivered your order at: {order?.placeOrderAt}
        </div>
      ) : (
        <div>You delivered the order at: {order?.placeOrderAt}</div>
      )}

      <div>
        {order.deliveredWorks?.map((work, i) => (
          <div key={i}>file {i}</div>
        ))}
      </div>

      {!order.accepted && isBuyer && (
        <div>
          <h1 className="text-[18px] font-bold">
            Are you ready to approve the delivery ?
          </h1>
          <p>If you have issue contact the seller in the inbox</p>
          <Button
            className="bg-green-400 text-white"
            onClick={() => approveDeliver(order.id)}
          >
            Yes, approve the delivery
          </Button>
        </div>
      )}

      {!order.accepted && !isBuyer && (
        <h1 className="text-[18px] font-bold">
          Waiting for order to be approved
        </h1>
      )}

      {order.accepted && isBuyer && (
        <h1 className="text-[18px] font-bold">Your order was completed</h1>
      )}

      {order.accepted && !isBuyer && (
        <h1 className="text-[18px] font-bold">The order was completed</h1>
      )}
    </div>
  );
};
