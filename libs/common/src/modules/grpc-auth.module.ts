import { GrpcGuard } from '@app/common/guards';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Global()
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
  ],
  providers: [GrpcGuard],
  exports: [JwtModule, GrpcGuard],
})
export class GrpcAuthModule {}
