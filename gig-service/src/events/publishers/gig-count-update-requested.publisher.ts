import {
  Exchanges,
  Publisher,
  RoutingKeys,
  type GigCountUpdateRequested,
} from "@fvoid/shared-lib";

export class GigCountUpdateRequestedPublisher extends Publisher<GigCountUpdateRequested> {
  exchangeName: Exchanges.GigCountUpdateRequested =
    Exchanges.GigCountUpdateRequested;
  routingKey: RoutingKeys.GigCountUpdateRequested =
    RoutingKeys.GigCountUpdateRequested;
}
