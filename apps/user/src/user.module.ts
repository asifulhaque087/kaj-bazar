import { Module } from '@nestjs/common';
import { BuyerModule } from './buyer/buyer.module';
import { SellerModule } from './seller/seller.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as localSchema from './schemas';
import * as Joi from 'joi';
import { DrizzleModule } from '@app/common';

@Module({
  imports: [
    BuyerModule,
    SellerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),

        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
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
  controllers: [],
  providers: [],
  // exports:[DrizzleModule]
})
export class UserModule {}
