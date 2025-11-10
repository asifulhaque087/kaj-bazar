import {
  Exchanges,
  Listener,
  Queues,
  RoutingKeys,
  type ReviewSeedReturned,
} from "@fvoid/shared-lib";
import type { ConsumeMessage } from "amqplib";

export class ReviewSeedReturnedListener extends Listener<ReviewSeedReturned> {
  exchangeName: Exchanges.ReviewSeedReturned = Exchanges.ReviewSeedReturned;
  queueName: Queues.ReviewSeedReturned = Queues.ReviewSeedReturned;
  routingKey: RoutingKeys.ReviewSeedReturned = RoutingKeys.ReviewSeedReturned;

  async onMessage(data: ReviewSeedReturned["data"], message: ConsumeMessage) {
    // const { buyers, sellers } = data;

    console.log("Database seed succesfully");

    this.channel.ack(message);
  }
}
