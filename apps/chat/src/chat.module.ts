import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as localSchema from './schemas';
import * as Joi from 'joi';
import { APP_GUARD } from '@nestjs/core';
import { DrizzleModule, GatewayGuard } from '@app/common';

@Module({
  // imports: [],

  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),

        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),

        GATEWAY_SECRET: Joi.string().required(),
      }),
    }),
    DrizzleModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connectionString: configService.getOrThrow<string>('DATABASE_URL'),
        schema: localSchema,
      }),
    }),
  ],
  controllers: [ChatController],
  providers: [
    ChatService,

    {
      provide: 'EXPECTED_SERVICE_NAME',
      useValue: 'chat',
    },
    {
      provide: 'GATEWAY_SECRET',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.getOrThrow<string>('GATEWAY_SECRET');
      },
    },
    {
      provide: APP_GUARD,
      useClass: GatewayGuard,
    },
  ],
})
export class ChatModule {}
