import {
  Exchanges,
  Publisher,
  RoutingKeys,
  type ReceiveSellersEvent,
} from "@fvoid/shared-lib";

export class ReceiveSellersPublisher extends Publisher<ReceiveSellersEvent> {
  exchangeName: Exchanges.Receive_Sellers = Exchanges.Receive_Sellers;
  routingKey: RoutingKeys.ReceiveSellers = RoutingKeys.ReceiveSellers;
}
