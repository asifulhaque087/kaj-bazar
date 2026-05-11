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
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    let accessToken = request.cookies['accessToken'];

    if (!accessToken || this.authService.isTokenExpired(accessToken)) {
      const refreshToken = request.cookies['refreshToken'];
      if (!refreshToken) throw new UnauthorizedException();

      // const newTokens = await this.authService.refreshTokens(refreshToken);
      // this will an grpc call to get tokens from auth service

      // const refreshResponse = await tryit(
      //   firstValueFrom(
      //     this.authService.refreshAccessToken({ token: refreshToken }),
      //   ),
      // );

      // const refreshResponse = await firstValueFrom(
      //   await this.authService.refreshAccessToken({ token: refreshToken }),
      // );

      const [refreshResponse, err] = await tryit(
        firstValueFrom(
          this.authService.refreshAccessToken({ token: refreshToken }),
        ),
      );

      if (err) {
        throw new InternalServerErrorException('An unexpected error occurred');
      }

      const { newAccessToken, newRefreshToken } = refreshResponse;

      // Update cookies and request header
      this.authService.setCookies(response, newAccessToken, newRefreshToken);
      request.headers['authorization'] = `Bearer ${newAccessToken}`;
    } else {
      request.headers['authorization'] = `Bearer ${accessToken}`;
    }

    return super.canActivate(context) as boolean;
  }
}
