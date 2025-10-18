import {
  Exchanges,
  Listener,
  Queues,
  RoutingKeys,
  type GetSellersEvent,
} from "@fvoid/shared-lib";
import { db } from "@src/db";
import { SellersTable } from "@src/schemas";
import { ReceiveSellersPublisher } from "@src/events/publishers/receive-sellers.publisher";
import type { ConsumeMessage } from "amqplib";
import { sql } from "drizzle-orm";

export class GetSellerListener extends Listener<GetSellersEvent> {
  exchangeName: Exchanges.Get_Sellers = Exchanges.Get_Sellers;
  queueName: Queues.Get_Sellers = Queues.Get_Sellers;
  routingKey: RoutingKeys.GetSellers = RoutingKeys.GetSellers;

  async onMessage(data: GetSellersEvent["data"], message: ConsumeMessage) {
    const { count } = data;

    // ** --- Fetch random seller ---
    const sellers = await db
      .select({
        id: SellersTable.id,
        email: SellersTable.email,
        username: SellersTable.username,
        profilePicture: SellersTable.profilePicture,
      })
      .from(SellersTable)
      .orderBy(sql`RANDOM()`);

    // ** --- Publish an event ---
    new ReceiveSellersPublisher(this.channel).publish({
      count: count,
      sellers: sellers,
    });

    this.channel.ack(message);
  }
}

// 100

// 30
