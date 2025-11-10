import {
  Exchanges,
  Publisher,
  RoutingKeys,
  type OrderSeedRequested,
} from "@fvoid/shared-lib";

export class OrderSeedRequestedPublisher extends Publisher<OrderSeedRequested> {
  exchangeName: Exchanges.OrderSeedRequested = Exchanges.OrderSeedRequested;
  routingKey: RoutingKeys.OrderSeedRequested = RoutingKeys.OrderSeedRequested;
}
