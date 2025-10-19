// ** Third Party Imports
import type { ConsumeMessage } from "amqplib";
import {
  Exchanges,
  handleAsync,
  Listener,
  Queues,
  RoutingKeys,
  type RemoveBuyersEvent,
} from "@fvoid/shared-lib";

// ** DB
import { db } from "@src/db";
import { BuyersTable } from "@src/schemas";

export class RemoveBuyersListener extends Listener<RemoveBuyersEvent> {
  exchangeName: Exchanges.Remove_Buyers_Exchange =
    Exchanges.Remove_Buyers_Exchange;
  queueName: Queues.Remove_Buyers_Queue = Queues.Remove_Buyers_Queue;
  routingKey: RoutingKeys.RemoveBuyers = RoutingKeys.RemoveBuyers;

  async onMessage(data: RemoveBuyersEvent["data"], message: ConsumeMessage) {
    await handleAsync(db.delete(BuyersTable));

    this.channel.ack(message);
  }
}
