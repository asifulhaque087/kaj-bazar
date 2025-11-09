import {
  Exchanges,
  Listener,
  Queues,
  RoutingKeys,
  type UserSeedReturned,
} from "@fvoid/shared-lib";
import type { ConsumeMessage } from "amqplib";

export class UserSeedReturnedListener extends Listener<UserSeedReturned> {
  exchangeName: Exchanges.UserSeedReturned = Exchanges.UserSeedReturned;
  queueName: Queues.UserSeedReturned = Queues.UserSeedReturned;
  routingKey: RoutingKeys.UserSeedReturned = RoutingKeys.UserSeedReturned;

  async onMessage(data: UserSeedReturned["data"], message: ConsumeMessage) {
    const { buyers, sellers } = data;

    this.channel.ack(message);
  }
}
