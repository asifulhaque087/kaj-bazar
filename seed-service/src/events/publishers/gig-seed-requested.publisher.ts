import {
  Exchanges,
  Publisher,
  RoutingKeys,
  type GigSeedRequested,
} from "@fvoid/shared-lib";

export class GigSeedRequestedPublisher extends Publisher<GigSeedRequested> {
  exchangeName: Exchanges.GigSeedRequested = Exchanges.GigSeedRequested;
  routingKey: RoutingKeys.GigSeedRequested = RoutingKeys.GigSeedRequested;
}
