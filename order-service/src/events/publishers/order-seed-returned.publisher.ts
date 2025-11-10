import {
  Exchanges,
  Publisher,
  RoutingKeys,
  type OrderSeedReturned,
} from "@fvoid/shared-lib";

export class OrderSeedReturnedPublisher extends Publisher<OrderSeedReturned> {
  exchangeName: Exchanges.OrderSeedReturned = Exchanges.OrderSeedReturned;
  routingKey: RoutingKeys.OrderSeedReturned = RoutingKeys.OrderSeedReturned;
}
