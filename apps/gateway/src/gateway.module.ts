import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { GigModule } from './gig/gig.module';
import { ChatModule } from './chat/chat.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),

        AUTH_GATEWAY_SECRET: Joi.string().required(),
        USER_GATEWAY_SECRET: Joi.string().required(),
        GIG_GATEWAY_SECRET: Joi.string().required(),
        CHAT_GATEWAY_SECRET: Joi.string().required(),
        ORDER_GATEWAY_SECRET: Joi.string().required(),
        REVIEW_GATEWAY_SECRET: Joi.string().required(),

        CLIENT_URL: Joi.string().required(),
      }),
    }),
    AuthModule,
    UserModule,
    GigModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class GatewayModule {}
