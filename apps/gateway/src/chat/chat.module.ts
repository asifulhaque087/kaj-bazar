import { Module } from '@nestjs/common';
import { AuthModule } from 'apps/gateway/src/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { createModuleAuthInterceptor } from 'apps/gateway/src/grpc.interceptor';
import { CHAT_PACKAGE_NAME } from '@app/common/generated/chat';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: 'CHAT_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: CHAT_PACKAGE_NAME,
            protoPath: 'libs/common/src/protos/chat.proto',
            url: 'chat:50051',
            channelOptions: {
              interceptors: [
                createModuleAuthInterceptor(
                  'chat',
                  configService.getOrThrow('CHAT_GATEWAY_SECRET'),
                ),
              ],
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [ChatGateway],
})
export class ChatModule {}
