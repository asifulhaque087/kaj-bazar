import {
  Exchanges,
  Publisher,
  RoutingKeys,
  type SendEmailEvent,
} from "@fvoid/shared-lib";

export class SendEmailPublisher extends Publisher<SendEmailEvent> {
  exchangeName: Exchanges.Mail_Exchange = Exchanges.Mail_Exchange;
  routingKey: RoutingKeys.SendEmail = RoutingKeys.SendEmail;
}
