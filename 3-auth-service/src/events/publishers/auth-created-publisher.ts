import {
  Exchanges,
  Publisher,
  RoutingKeys,
  type AuthCreatedEvent,
} from "@fvoid/shared-lib";

export class AuthCreatedPublisher extends Publisher<AuthCreatedEvent> {
  exchangeName: Exchanges.Mail_Exchange = Exchanges.Mail_Exchange;
  routingKey: RoutingKeys.AuthCreated = RoutingKeys.AuthCreated;
  //   routingKey: RoutingKeys.BuyerUpdated= RoutingKeys.BuyerUpdated;
}
