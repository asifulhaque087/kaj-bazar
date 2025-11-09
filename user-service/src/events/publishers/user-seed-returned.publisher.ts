import {
  Exchanges,
  Publisher,
  RoutingKeys,
  type UserSeedReturned,
} from "@fvoid/shared-lib";

export class UserSeedReturnedPublisher extends Publisher<UserSeedReturned> {
  exchangeName: Exchanges.UserSeedReturned = Exchanges.UserSeedReturned;
  routingKey: RoutingKeys.UserSeedReturned = RoutingKeys.UserSeedReturned;
}
