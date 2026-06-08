import { AUTH_PACKAGE_NAME } from '@app/common/generated/auth';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { createModuleAuthInterceptor } from '../grpc.interceptor';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { GoogleStrategy } from '../strategies/google.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { getProtoPath } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
      }),
      inject: [ConfigService],
    }),

    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: AUTH_PACKAGE_NAME,
            protoPath: getProtoPath('auth.proto'),
            url: 'auth:50051',
            channelOptions: {
              interceptors: [
                createModuleAuthInterceptor(
                  'auth',
                  configService.getOrThrow('AUTH_GATEWAY_SECRET'),
                ),
              ],
            },
          },
        }),
        inject: [ConfigService],
      },

      // {
      //   name: 'USER_SERVICE',
      //   useFactory: (configService: ConfigService) => ({
      //     transport: Transport.GRPC,
      //     options: {
      //       package: USER_PACKAGE_NAME,
      //       protoPath: 'libs/common/src/protos/user.proto',
      //       url: 'user:50051',
      //       channelOptions: {
      //         interceptors: [
      //           createModuleAuthInterceptor(
      //             'user',
      //             configService.getOrThrow('USER_GATEWAY_SECRET'),
      //           ),
      //         ],
      //       },
      //     },
      //   }),
      //   inject: [ConfigService],
      // },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenGuard, GoogleStrategy, JwtStrategy],
  exports: [AuthService, JwtModule, AccessTokenGuard],
})
export class AuthModule {}
