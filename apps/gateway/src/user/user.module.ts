import { Module } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { USER_PACKAGE_NAME } from '@app/common/generated/user';
import { createModuleAuthInterceptor } from 'apps/gateway/src/grpc.interceptor';
import { AuthModule } from 'apps/gateway/src/auth/auth.module';

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
            protoPath: 'libs/common/src/protos/user.proto',
            url: 'user:50051',
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
  controllers: [BuyerController],
  providers: [BuyerService],
})
export class UserModule {}
