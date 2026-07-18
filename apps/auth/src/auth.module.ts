import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { DrizzleModule, GatewayGuard } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as localSchema from './schemas';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
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

        REFRESH_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION: Joi.string().required(),

        GATEWAY_SECRET: Joi.string().required(),

        CLIENT_URL: Joi.string().required(),
      }),
    }),

    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow('ACCESS_TOKEN_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
    DrizzleModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connectionString: configService.getOrThrow<string>('DATABASE_URL'),
        schema: localSchema,
      }),
    }),

    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://kaj_bazar:kaj_bazarpass@rabbitmq:5672'],
          queue: 'email-queue',
        },
      },

      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://kaj_bazar:kaj_bazarpass@rabbitmq:5672'],
          queue: 'user-queue',
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,

    {
      provide: 'EXPECTED_SERVICE_NAME',
      useValue: 'auth',
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
export class AuthModule {}
