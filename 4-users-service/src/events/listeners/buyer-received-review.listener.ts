import {
  Exchanges,
  FanoutListener,
  type Buyer_Received_Review_Event,
  type BuyerReceivedReviewQueues,
} from "@fvoid/shared-lib";
import type { ConsumeMessage } from "amqplib";

export class BuyerReceivedReviewListener extends FanoutListener<Buyer_Received_Review_Event> {
  exchangeName: Exchanges.Buyer_Received_Review =
    Exchanges.Buyer_Received_Review;
  queueName: BuyerReceivedReviewQueues = "buyer-received-review-queue-user";

  async onMessage(
    data: Buyer_Received_Review_Event["data"],
    message: ConsumeMessage
  ) {
    this.channel.ack(message);

    console.log(
      "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ user service ",
      data
    );
  }
}
