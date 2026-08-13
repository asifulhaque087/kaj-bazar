import { SendEmailEventRequestDto, tryit } from '@app/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async sendEmail(data: SendEmailEventRequestDto) {
    const {
      receiver,
      verifyLink,
      templateName,
      username,
      otp,
      resetLink,
      subject,
    } = data;

    const locals = {
      appLink: `${this.configService.getOrThrow<string>('CLIENT_URL')}`,
      appIcon: 'https://i.ibb.co/Kyp2m0t/cover.png',
      username,
      verifyLink,
      resetLink,
      otp,
    };

    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Email => Email Service', {
      to: receiver,
      subject: subject || 'Notification from Kaj Bazar',
      template: templateName,
      context: locals,
    });

    const [_, emailErr] = await tryit(
      this.mailerService.sendMail({
        to: receiver,
        subject: subject || 'Notification from Kaj Bazar',
        // subject: subject || locals.subject || 'Notification from Kaj Bazar',
        template: templateName,
        context: locals,
      }),
    );

    if (emailErr) {
      console.log(
        '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Email => Email Service',
        emailErr,
      );
    }
    // if (emailErr) return throwGrpcError('INTERNAL', emailErr.message);
  }
}
