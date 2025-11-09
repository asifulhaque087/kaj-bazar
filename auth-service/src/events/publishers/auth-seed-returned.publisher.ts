import {
  Exchanges,
  Publisher,
  RoutingKeys,
  type AuthSeedReturned,
} from "@fvoid/shared-lib";

export class AuthSeedReturnedPublisher extends Publisher<AuthSeedReturned> {
  exchangeName: Exchanges.AuthSeedReturned = Exchanges.AuthSeedReturned;
  routingKey: RoutingKeys.AuthSeedReturned = RoutingKeys.AuthSeedReturned;
}
