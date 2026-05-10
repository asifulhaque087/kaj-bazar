import { AUTH_PACKAGE_NAME } from '@app/common/generated/auth';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { createModuleAuthInterceptor } from 'apps/gateway/src/grpc.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: AUTH_PACKAGE_NAME,
            protoPath: 'libs/common/src/protos/auth.proto',
            url: 'auth:50051',
            channelOptions: {
              interceptors: [createModuleAuthInterceptor('auth', 'hello-auth')],
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
