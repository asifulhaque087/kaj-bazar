import { tryit } from '@app/common';
import {
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'apps/gateway/src/auth/auth.service';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService) {
    super();
    // console.log('🚀 AccessTokenGuard has been instantiated by NestJS!');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    let accessToken = request.cookies['accessToken'];

    if (!accessToken || this.authService.isTokenExpired(accessToken)) {
      const refreshToken = request.cookies['refreshToken'];
      if (!refreshToken) throw new UnauthorizedException();

      // const [refreshResponse, err] = await tryit(
      //   firstValueFrom(
      //     this.authService.refreshAccessToken({ token: refreshToken }),
      //   ),
      // );

      const refreshResponse = await this.authService.refreshAccessToken({
        token: refreshToken,
      });

      // const [refreshResponse, err] = await tryit(
      //   this.authService.refreshAccessToken({
      //     token: refreshToken,
      //   }),
      // );

      // if (err) {
      //   throw new InternalServerErrorException(err.message);
      // }

      // if (err) {
      //   throw new InternalServerErrorException('An unexpected error occurred');
      // }

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
