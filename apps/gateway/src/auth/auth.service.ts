import { RefreshAccessTokenDto, RegisterUserDto } from '@app/common';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
} from '@app/common/generated/auth';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { ClientGrpc } from '@nestjs/microservices';
import ms, { StringValue } from 'ms';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  private authGrpcService!: AuthServiceClient;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject('AUTH_SERVICE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.authGrpcService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async register(data: RegisterUserDto) {
    return firstValueFrom(this.authGrpcService.register(data));
  }

  async upsertUser() {
    // here we will call grpc methods

    return {
      message: 'we will call grpc function here',
      name: 'user1',
      email: 'user1@gmail.com',
    };

    // return {};
  }

  refreshAccessToken(data: RefreshAccessTokenDto) {
    return this.authGrpcService.refreshAccessToken(data);
  }

  getCookieSettings(accessToken: string, refreshToken: string) {
    const accessTokenExp = this.configService.getOrThrow<string>(
      'ACCESS_TOKEN_EXPIRATION',
    );

    const refreshTokenExp = this.configService.getOrThrow<string>(
      'REFRESH_TOKEN_EXPIRATION',
    );

    return {
      access: {
        name: 'accessToken',
        value: accessToken,
        options: {
          httpOnly: true,
          secure: true,
          maxAge: ms(accessTokenExp as StringValue),
        },
      },
      refresh: {
        name: 'refreshToken',
        value: refreshToken,
        options: {
          httpOnly: true,
          secure: true,
          maxAge: ms(refreshTokenExp as StringValue),
        },
      },
    };

    // res.cookie('is_auth', true, {
    //   httpOnly: false,
    //   maxAge: Number(refreshTokenExp),
    // });
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = this.jwtService.decode(token);

      if (!payload || !payload.exp) {
        return true; // If there's no expiration claim, treat it as expired/invalid
      }

      const expiresAt = payload.exp * 1000; // Convert to milliseconds
      const now = Date.now();

      // We add a 10-second buffer to handle "clock drift" or network latency
      const buffer = 10 * 1000;

      return now + buffer >= expiresAt;
    } catch (error) {
      // If decoding fails (malformed token), treat it as expired
      return true;
    }
  }
}
