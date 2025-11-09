import {
  Exchanges,
  Listener,
  Queues,
  RoutingKeys,
  type GigSeedReturned,
} from "@fvoid/shared-lib";
import type { ConsumeMessage } from "amqplib";

export class GigSeedReturnedListener extends Listener<GigSeedReturned> {
  exchangeName: Exchanges.GigSeedReturned = Exchanges.GigSeedReturned;
  queueName: Queues.GigSeedReturned = Queues.GigSeedReturned;
  routingKey: RoutingKeys.GigSeedReturned = RoutingKeys.GigSeedReturned;

  async onMessage(data: GigSeedReturned["data"], message: ConsumeMessage) {
    const { buyers, sellers } = data;

    this.channel.ack(message);
  }
}
