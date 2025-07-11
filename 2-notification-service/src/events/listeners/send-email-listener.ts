import { Exchanges, Listener, Queues, RoutingKeys, SendEmailEvent } from '@fvoid/shared-lib';
import { sendEmail } from '@notifications/queues/mail.transport';
import type { ConsumeMessage } from 'amqplib';

import { config } from '@notifications/config';

export class SendEmailListener extends Listener<SendEmailEvent> {
  exchangeName: Exchanges.Mail_Exchange = Exchanges.Mail_Exchange;
  queueName: Queues.Mail_Queue = Queues.Mail_Queue;
  routingKey: RoutingKeys.SendEmail = RoutingKeys.SendEmail;

  async onMessage(data: SendEmailEvent['data'], message: ConsumeMessage) {
    const { receiverEmail, verifyLink, template, username, otp, resetLink } = data;

    const locals = {
      appLink: `${config.CLIENT_URL}`,
      appIcon: 'https://i.ibb.co/Kyp2m0t/cover.png',
      username,
      verifyLink,
      resetLink,
      otp
    };

    await sendEmail(template, receiverEmail, locals);

    this.channel.ack(message);
  }
}
