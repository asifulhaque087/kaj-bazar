import {
  Exchanges,
  Publisher,
  RoutingKeys,
  type GigSeedReturned,
} from "@fvoid/shared-lib";

export class GigSeedReturnedPublisher extends Publisher<GigSeedReturned> {
  exchangeName: Exchanges.GigSeedReturned = Exchanges.GigSeedReturned;
  routingKey: RoutingKeys.GigSeedReturned = RoutingKeys.GigSeedReturned;
}
