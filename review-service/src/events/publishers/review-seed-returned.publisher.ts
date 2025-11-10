import {
  Exchanges,
  Publisher,
  RoutingKeys,
  type ReviewSeedReturned,
} from "@fvoid/shared-lib";

export class ReviewSeedReturnedPublisher extends Publisher<ReviewSeedReturned> {
  exchangeName: Exchanges.ReviewSeedReturned = Exchanges.ReviewSeedReturned;
  routingKey: RoutingKeys.ReviewSeedReturned = RoutingKeys.ReviewSeedReturned;
}
