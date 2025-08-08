import {
  Exchanges,
  FanoutListener,
  type Buyer_Received_Review_Event,
} from "@fvoid/shared-lib";
import type { ConsumeMessage } from "amqplib";

export class BuyerReceivedReviewListener extends FanoutListener<Buyer_Received_Review_Event> {
  exchangeName: Exchanges.Buyer_Received_Review =
    Exchanges.Buyer_Received_Review;
  queueName: "buyer-received-review-queue-order" =
    "buyer-received-review-queue-order";

  async onMessage(
    data: Buyer_Received_Review_Event["data"],
    message: ConsumeMessage
  ) {
    this.channel.ack(message);

    console.log(
      "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ order service ",
      data
    );
  }
}
