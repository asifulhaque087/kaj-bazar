import {
  Exchanges,
  Listener,
  Queues,
  RoutingKeys,
  type OrderSeedReturned,
} from "@fvoid/shared-lib";
import { ReviewSeedRequestedPublisher } from "@src/events/publishers/review-seed-requested.publisher";
import type { ConsumeMessage } from "amqplib";

export class OrderSeedReturnedListener extends Listener<OrderSeedReturned> {
  exchangeName: Exchanges.OrderSeedReturned = Exchanges.OrderSeedReturned;
  queueName: Queues.OrderSeedReturned = Queues.OrderSeedReturned;
  routingKey: RoutingKeys.OrderSeedReturned = RoutingKeys.OrderSeedReturned;

  async onMessage(data: OrderSeedReturned["data"], message: ConsumeMessage) {
    const { orders } = data;

    // ** --- publish an event ---
    new ReviewSeedRequestedPublisher(this.channel).publish({
      orders,
    });

    this.channel.ack(message);
  }
}
