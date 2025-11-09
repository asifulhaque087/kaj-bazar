import {
  Exchanges,
  FanoutListener,
  handleAsync,
  type Buyer_Received_Review_Event,
  type BuyerReceivedReviewQueues,
} from "@fvoid/shared-lib";
import { db } from "@src/db";
import { OrdersTable } from "@src/schemas";
import type { Channel, ConsumeMessage } from "amqplib";
import { eq } from "drizzle-orm";
import type { Server } from "socket.io";

export class BuyerReceivedReviewListener extends FanoutListener<Buyer_Received_Review_Event> {
  exchangeName: Exchanges.Buyer_Received_Review =
    Exchanges.Buyer_Received_Review;
  queueName: BuyerReceivedReviewQueues = "buyer-received-review-queue-order";

  constructor(public io: Server, channel: Channel) {
    super(channel);
  }

  async onMessage(
    data: Buyer_Received_Review_Event["data"],
    message: ConsumeMessage
  ) {
    const { orderId, ratings, comment, reivewGivenAt } = data;

    const reviewObject = {
      rating: ratings,
      review: comment,
      receivedAt: new Date(reivewGivenAt).toISOString(),
    };

    const [order] = await handleAsync(
      db
        .update(OrdersTable)
        .set({
          buyerReceivedReview: reviewObject,
        })
        .where(eq(OrdersTable.id, orderId))
        .returning()
    );

    this.io.emit("order notification", "buyer received review", order);

    this.channel.ack(message);
  }
}
