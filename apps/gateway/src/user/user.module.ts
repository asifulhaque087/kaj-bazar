import { Module } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { USER_PACKAGE_NAME } from '@app/common/generated/user';
import { getProtoPath } from '@app/common';
import { createModuleAuthInterceptor } from '../grpc.interceptor';
import { AuthModule } from '../auth/auth.module';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: USER_PACKAGE_NAME,
            protoPath: getProtoPath('user.proto'),
            url: configService.get('USER_GRPC_URL') ?? 'user:50051',
            channelOptions: {
              interceptors: [
                createModuleAuthInterceptor(
                  'user',
                  configService.getOrThrow('USER_GATEWAY_SECRET'),
                ),
              ],
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [BuyerController, SellerController],
  providers: [BuyerService, SellerService],
})
export class UserModule {}
