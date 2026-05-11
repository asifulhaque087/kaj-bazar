import { AUTH_PACKAGE_NAME } from '@app/common/generated/auth';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { createModuleAuthInterceptor } from 'apps/gateway/src/grpc.interceptor';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenGuard } from 'apps/gateway/src/guards/access-token.guard';
import { GoogleStrategy } from 'apps/gateway/src/strategies/google.strategy';
import { JwtStrategy } from 'apps/gateway/src/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
        // signOptions: {
        //   expiresIn: configService.getOrThrow('ACCESS_TOKEN_EXPIRATION'),
        // },
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
  providers: [AuthService, AccessTokenGuard, GoogleStrategy, JwtStrategy],
  exports: [AuthService, JwtModule, AccessTokenGuard],
})
export class AuthModule {}
