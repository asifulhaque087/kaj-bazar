import {
  Exchanges,
  handleAsync,
  Listener,
  Queues,
  RoutingKeys,
  type CreateBuyerEvent,
} from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { BuyersTable } from "@src/drizzle/schemas";
import type { ConsumeMessage } from "amqplib";

export class CreateBuyerListener extends Listener<CreateBuyerEvent> {
  exchangeName: Exchanges.Create_Buyers_Exchange =
    Exchanges.Create_Buyers_Exchange;
  queueName: Queues.Create_Buyers_Queue = Queues.Create_Buyers_Queue;
  routingKey: RoutingKeys.CreateBuyer = RoutingKeys.CreateBuyer;

  async onMessage(data: CreateBuyerEvent["data"], message: ConsumeMessage) {
    const result = await handleAsync(
      db
        .insert(BuyersTable)
        .values(data)
        .returning()
        .then((res) => res[0])
    );

    this.channel.ack(message);
  }
}
