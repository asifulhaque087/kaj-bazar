import { Module } from '@nestjs/common';
import { BuyerModule } from './buyer/buyer.module';
import { SellerModule } from './seller/seller.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as localSchema from './schemas';
import * as Joi from 'joi';
import { DrizzleModule, GatewayGuard, GrpcAuthModule } from '@app/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

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
        GATEWAY_SECRET: Joi.string().required(),
      }),
    }),

    GrpcAuthModule,
    BuyerModule,
    SellerModule,
    DrizzleModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connectionString: configService.getOrThrow<string>('DATABASE_URL'),
        schema: localSchema,
      }),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: 'EXPECTED_SERVICE_NAME',
      useValue: 'user',
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
  // exports:[DrizzleModule]
  // exports: [JwtModule],
})
export class UserModule {}
