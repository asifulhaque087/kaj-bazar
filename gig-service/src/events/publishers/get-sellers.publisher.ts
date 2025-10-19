import {
  Exchanges,
  Publisher,
  RoutingKeys,
  type GetSellersEvent,
} from "@fvoid/shared-lib";

export class GetSellersPublisher extends Publisher<GetSellersEvent> {
  exchangeName: Exchanges.Get_Sellers = Exchanges.Get_Sellers;
  routingKey: RoutingKeys.GetSellers = RoutingKeys.GetSellers;
}
