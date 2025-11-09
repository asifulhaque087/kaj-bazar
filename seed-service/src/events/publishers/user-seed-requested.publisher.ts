import {
  Exchanges,
  Publisher,
  RoutingKeys,
  type UserSeedRequested,
} from "@fvoid/shared-lib";

export class UserSeedRequestedPublisher extends Publisher<UserSeedRequested> {
  exchangeName: Exchanges.UserSeedRequested = Exchanges.UserSeedRequested;
  routingKey: RoutingKeys.UserSeedRequested = RoutingKeys.UserSeedRequested;
}
