import {
  Exchanges,
  Listener,
  Queues,
  RoutingKeys,
  type AuthSeedReturned,
} from "@fvoid/shared-lib";
import type { ConsumeMessage } from "amqplib";

export class AuthSeedReturnedListener extends Listener<AuthSeedReturned> {
  exchangeName: Exchanges.AuthSeedReturned = Exchanges.AuthSeedReturned;
  queueName: Queues.AuthSeedReturned = Queues.AuthSeedReturned;
  routingKey: RoutingKeys.AuthSeedReturned = RoutingKeys.AuthSeedReturned;

  async onMessage(data: AuthSeedReturned["data"], message: ConsumeMessage) {
    const { authUsers } = data;

    this.channel.ack(message);
  }
}
