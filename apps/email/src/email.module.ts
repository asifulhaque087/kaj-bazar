import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import * as Joi from 'joi';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/adapters/ejs.adapter';

console.log('!!!!!!!!!!!!!!!!!!!!!!!!!! ', __dirname);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SENDER_EMAIL: Joi.string().required(),
        SENDER_EMAIL_PASSWORD: Joi.string().required(),
        CLIENT_URL: Joi.string().required(),
      }),
    }),

    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
            user: config.get<string>('SENDER_EMAIL'),
            pass: config.get<string>('SENDER_EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"Kaj Bazar App" <${config.get<string>('SENDER_EMAIL')}>`,
        },
        template: {
          // Points to your local template directory
          dir: join(__dirname, 'templates'),
          // dir: 'apps/email/src/templates',
          // dir: join(__dirname, '..', 'templates'),
          adapter: new EjsAdapter({
            inlineCssEnabled: true, // Replaces 'juice: true' for inlining CSS styles
          }),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
