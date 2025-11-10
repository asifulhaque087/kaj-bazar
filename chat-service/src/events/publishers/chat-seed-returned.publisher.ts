import {
  Exchanges,
  Publisher,
  RoutingKeys,
  type ChatSeedReturned,
} from "@fvoid/shared-lib";

export class ChatSeedReturnedPublisher extends Publisher<ChatSeedReturned> {
  exchangeName: Exchanges.ChatSeedReturned = Exchanges.ChatSeedReturned;
  routingKey: RoutingKeys.ChatSeedReturned = RoutingKeys.ChatSeedReturned;
}
