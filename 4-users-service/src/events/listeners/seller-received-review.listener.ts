import {
  Exchanges,
  FanoutListener,
  type Seller_Received_Review_Event,
} from "@fvoid/shared-lib";
import type { ConsumeMessage } from "amqplib";

export class SellerReceivedReviewListener extends FanoutListener<Seller_Received_Review_Event> {
  exchangeName: Exchanges.Seller_Received_Review =
    Exchanges.Seller_Received_Review;
  queueName: "seller-received-review-queue-user" =
    "seller-received-review-queue-user";

  async onMessage(
    data: Seller_Received_Review_Event["data"],
    message: ConsumeMessage
  ) {
    console.log("####################################  user service ", data);

    this.channel.ack(message);
  }
}
