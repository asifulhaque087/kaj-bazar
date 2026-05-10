import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { GatewayGuard } from 'apps/auth/src/gateway.guard';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'EXPECTED_SERVICE_NAME',
      useValue: 'auth',
    },
    {
      provide: APP_GUARD,
      useClass: GatewayGuard,
    },
  ],
})
export class AuthModule {}
