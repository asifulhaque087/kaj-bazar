import {
  Exchanges,
  Publisher,
  RoutingKeys,
  type RemoveBuyersEvent,
} from "@fvoid/shared-lib";

export class RemoveBuyersPublisher extends Publisher<RemoveBuyersEvent> {
  exchangeName: Exchanges.Remove_Buyers_Exchange =
    Exchanges.Remove_Buyers_Exchange;
  routingKey: RoutingKeys.RemoveBuyers = RoutingKeys.RemoveBuyers;
}
