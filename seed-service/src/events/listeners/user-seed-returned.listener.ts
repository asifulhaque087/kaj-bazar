import {
  Exchanges,
  Listener,
  Queues,
  RoutingKeys,
  type UserSeedReturned,
} from "@fvoid/shared-lib";
import { GigSeedRequestedPublisher } from "@src/events/publishers/gig-seed-requested.publisher";
import type { ConsumeMessage } from "amqplib";

export class UserSeedReturnedListener extends Listener<UserSeedReturned> {
  exchangeName: Exchanges.UserSeedReturned = Exchanges.UserSeedReturned;
  queueName: Queues.UserSeedReturned = Queues.UserSeedReturned;
  routingKey: RoutingKeys.UserSeedReturned = RoutingKeys.UserSeedReturned;

  async onMessage(data: UserSeedReturned["data"], message: ConsumeMessage) {
    const { buyers } = data;

    // ** --- publish an event ---
    new GigSeedRequestedPublisher(this.channel).publish({
      buyers,
    });

    this.channel.ack(message);
  }
}
