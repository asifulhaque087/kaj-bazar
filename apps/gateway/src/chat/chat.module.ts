import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { createModuleAuthInterceptor } from '../grpc.interceptor';
import { CHAT_PACKAGE_NAME } from '@app/common/generated/chat';
import { getProtoPath } from '@app/common';
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
            protoPath: getProtoPath('chat.proto'),
            url: configService.get('CHAT_GRPC_URL') ?? 'chat:50051',
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
