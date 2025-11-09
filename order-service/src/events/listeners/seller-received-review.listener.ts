import {
  Exchanges,
  FanoutListener,
  handleAsync,
  type Seller_Received_Review_Event,
  type SellerReceivedReviewQueues,
} from "@fvoid/shared-lib";
import { db } from "@src/db";
import { OrdersTable } from "@src/schemas";
import type { Channel, ConsumeMessage } from "amqplib";
import { eq } from "drizzle-orm";
import type { Server } from "socket.io";

export class SellerReceivedReviewListener extends FanoutListener<Seller_Received_Review_Event> {
  exchangeName: Exchanges.Seller_Received_Review =
    Exchanges.Seller_Received_Review;

  queueName: SellerReceivedReviewQueues = "seller-received-review-queue-order";

  constructor(public io: Server, channel: Channel) {
    super(channel);
  }

  async onMessage(
    data: Seller_Received_Review_Event["data"],
    message: ConsumeMessage
  ) {
    const { orderId, ratings, comment, reivewGivenAt } = data;

    const reviewObject = {
      rating: ratings,
      review: comment,
      // receivedAt: reivewGivenAt.toISOString(),
      receivedAt: new Date(reivewGivenAt).toISOString(),
      // receivedAt: reivewGivenAt,
    };

    const [order] = await handleAsync(
      db
        .update(OrdersTable)
        .set({
          sellerReceivedReview: reviewObject,
        })
        .where(eq(OrdersTable.id, orderId))
        .returning()
    );

    this.io.emit("order notification", "seller received review", order);

    this.channel.ack(message);
  }
}
