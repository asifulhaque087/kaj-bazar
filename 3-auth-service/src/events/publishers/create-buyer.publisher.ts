import {
  Exchanges,
  Publisher,
  RoutingKeys,
  type CreateBuyerEvent,
} from "@fvoid/shared-lib";

export class CreateBuyerPublisher extends Publisher<CreateBuyerEvent> {
  exchangeName: Exchanges.Create_Buyers_Exchange =
    Exchanges.Create_Buyers_Exchange;
  routingKey: RoutingKeys.CreateBuyer = RoutingKeys.CreateBuyer;
}
