import { AuthCreatedEvent, Exchanges, Listener, Queues, RoutingKeys } from '@fvoid/shared-lib';
import { sendEmail } from '@notifications/queues/mail.transport';
import type { ConsumeMessage } from 'amqplib';

import { config } from '@notifications/config';

export class AuthCreatedListener extends Listener<AuthCreatedEvent> {
  exchangeName: Exchanges.Mail_Exchange = Exchanges.Mail_Exchange;
  queueName: Queues.Mail_Queue = Queues.Mail_Queue;
  routingKey: RoutingKeys.AuthCreated = RoutingKeys.AuthCreated;

  async onMessage(data: AuthCreatedEvent['data'], message: ConsumeMessage) {
    console.log('event data is ', data);

    const { receiverEmail, verifyLink, template } = data;

    const locals = {
      appLink: `${config.CLIENT_URL}`,
      appIcon: 'https://i.ibb.co/Kyp2m0t/cover.png',
      verifyLink
    };

    await sendEmail(template, receiverEmail, locals);

    this.channel.ack(message);
  }
}
