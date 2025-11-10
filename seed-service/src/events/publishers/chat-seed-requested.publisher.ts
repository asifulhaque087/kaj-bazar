import {
  Exchanges,
  Publisher,
  RoutingKeys,
  type ChatSeedRequested,
} from "@fvoid/shared-lib";

export class ChatSeedRequestedPublisher extends Publisher<ChatSeedRequested> {
  exchangeName: Exchanges.ChatSeedRequested = Exchanges.ChatSeedRequested;
  routingKey: RoutingKeys.ChatSeedRequested = RoutingKeys.ChatSeedRequested;
}
