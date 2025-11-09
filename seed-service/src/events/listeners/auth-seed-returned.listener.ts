import {
  Exchanges,
  Listener,
  Queues,
  RoutingKeys,
  type AuthSeedReturned,
} from "@fvoid/shared-lib";
import { UserSeedRequestedPublisher } from "@src/events/publishers/user-seed-requested.publisher";
import type { ConsumeMessage } from "amqplib";

export class AuthSeedReturnedListener extends Listener<AuthSeedReturned> {
  exchangeName: Exchanges.AuthSeedReturned = Exchanges.AuthSeedReturned;
  queueName: Queues.AuthSeedReturned = Queues.AuthSeedReturned;
  routingKey: RoutingKeys.AuthSeedReturned = RoutingKeys.AuthSeedReturned;

  async onMessage(data: AuthSeedReturned["data"], message: ConsumeMessage) {
    console.log(
      "I am from @@@@@@AuthSeedReturnedListener@@@@@@@@ of seed service"
    );

    const { authUsers } = data;

    // ** --- publish an event ---
    new UserSeedRequestedPublisher(this.channel).publish({
      authUsers,
    });

    this.channel.ack(message);
  }
}
