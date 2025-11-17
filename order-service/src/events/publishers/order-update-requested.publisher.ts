import {
  Exchanges,
  Publisher,
  RoutingKeys,
  type OrderUpdateRequested,
} from "@fvoid/shared-lib";

export class OrderUpdateRequestedPublisher extends Publisher<OrderUpdateRequested> {
  exchangeName: Exchanges.OrderUpdateRequested = Exchanges.OrderUpdateRequested;
  routingKey: RoutingKeys.OrderUpdateRequested =
    RoutingKeys.OrderUpdateRequested;
}
