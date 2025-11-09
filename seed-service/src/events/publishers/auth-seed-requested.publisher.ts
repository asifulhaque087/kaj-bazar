import {
  Exchanges,
  Publisher,
  RoutingKeys,
  type AuthSeedRequested,
} from "@fvoid/shared-lib";

export class AuthSeedRequestedPublisher extends Publisher<AuthSeedRequested> {
  exchangeName: Exchanges.AuthSeedRequested = Exchanges.AuthSeedRequested;
  routingKey: RoutingKeys.AuthSeedRequested = RoutingKeys.AuthSeedRequested;
}
