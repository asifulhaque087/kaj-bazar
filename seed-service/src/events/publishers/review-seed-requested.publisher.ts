import {
  Exchanges,
  Publisher,
  RoutingKeys,
  type ReviewSeedRequested,
} from "@fvoid/shared-lib";

export class ReviewSeedRequestedPublisher extends Publisher<ReviewSeedRequested> {
  exchangeName: Exchanges.ReviewSeedRequested = Exchanges.ReviewSeedRequested;
  routingKey: RoutingKeys.ReviewSeedRequested = RoutingKeys.ReviewSeedRequested;
}
