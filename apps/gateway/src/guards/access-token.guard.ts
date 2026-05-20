import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'apps/gateway/src/auth/auth.service';
import { Response } from 'express';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super();
    // console.log('🚀 AccessTokenGuard has been instantiated by NestJS!');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    let accessToken = request.cookies['accessToken'];
    const accessSecret = this.configService.getOrThrow('ACCESS_TOKEN_SECRET');
    const refreshSecret = this.configService.getOrThrow('REFRESH_TOKEN_SECRET');

    if (
      !accessToken ||
      this.authService.isTokenExpired(accessToken, accessSecret)
    ) {
      const refreshToken = request.cookies['refreshToken'];
      if (!refreshToken) throw new UnauthorizedException();

      if (this.authService.isTokenExpired(refreshToken, refreshSecret)) {
        throw new UnauthorizedException();
      }

      const refreshResponse = await this.authService.refreshAccessToken({
        token: refreshToken,
      });

      const { newAccessToken, newRefreshToken } = refreshResponse;

      const cookieSettings = this.authService.getCookieSettings(
        newAccessToken,
        newRefreshToken,
      );

      response.cookie(
        cookieSettings.access.name,
        cookieSettings.access.value,
        cookieSettings.access.options,
      );
      response.cookie(
        cookieSettings.refresh.name,
        cookieSettings.refresh.value,
        cookieSettings.refresh.options,
      );

      request.headers['authorization'] = `Bearer ${newAccessToken}`;
    } else {
      request.headers['authorization'] = `Bearer ${accessToken}`;
    }

    return super.canActivate(context) as boolean;
  }
}
