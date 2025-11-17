import {
  catchError,
  Exchanges,
  Listener,
  Queues,
  RoutingKeys,
  type GigCountUpdateRequested,
} from "@fvoid/shared-lib";
import type { ConsumeMessage } from "amqplib";
import { db } from "@src/db";
import { SellersTable } from "@src/schemas";
import { eq } from "drizzle-orm";

// ** --- types ---

export class GigCountUpdateRequestedListener extends Listener<GigCountUpdateRequested> {
  exchangeName: Exchanges.GigCountUpdateRequested =
    Exchanges.GigCountUpdateRequested;
  queueName: Queues.GigCountUpdateRequested = Queues.GigCountUpdateRequested;
  routingKey: RoutingKeys.GigCountUpdateRequested =
    RoutingKeys.GigCountUpdateRequested;

  async onMessage(
    data: GigCountUpdateRequested["data"],
    message: ConsumeMessage
  ) {
    const { gigs } = data;

    const sellerGigCountMap = new Map<string, number>();

    gigs.forEach((gig) => {
      const val = sellerGigCountMap.get(gig.sellerId) || 0;

      sellerGigCountMap.set(gig.sellerId, val + 1);
    });

    for (const [sellerId, totalGigs] of sellerGigCountMap.entries()) {
      const [sellerError, seller] = await catchError(
        db
          .update(SellersTable)
          .set({
            totalGigs: totalGigs,
          })
          .where(eq(SellersTable.id, sellerId))
          .returning()
      );

      // console.log("####################### seller ", seller);
    }

    this.channel.ack(message);
  }
}
