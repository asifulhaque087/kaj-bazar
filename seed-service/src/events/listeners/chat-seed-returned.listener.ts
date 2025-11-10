import {
  Exchanges,
  Listener,
  Queues,
  RoutingKeys,
  type ChatSeedReturned,
} from "@fvoid/shared-lib";
import { OrderSeedRequestedPublisher } from "@src/events/publishers/order-seed-requested.publisher";
import type { ConsumeMessage } from "amqplib";

export class ChatSeedReturnedListener extends Listener<ChatSeedReturned> {
  exchangeName: Exchanges.ChatSeedReturned = Exchanges.ChatSeedReturned;
  queueName: Queues.ChatSeedReturned = Queues.ChatSeedReturned;
  routingKey: RoutingKeys.ChatSeedReturned = RoutingKeys.ChatSeedReturned;

  async onMessage(data: ChatSeedReturned["data"], message: ConsumeMessage) {
    const { buyers, gigs, messages } = data;

    new OrderSeedRequestedPublisher(this.channel).publish({
      buyers,
      gigs,
      messages,
    });

    this.channel.ack(message);
  }
}
