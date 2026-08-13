import {
  ChangePasswordRequestDto,
  ForgotPasswordRequestDto,
  LoginUserRequestDto,
  RefreshAccessTokenRequestDto,
  RegisterUserRequestDto,
  ResendVerificationLinkRequestDto,
  ResetPasswordRequestDto,
  ValidateSocialUserRequestDto,
  VerifyEmailRequestDto,
} from '@app/common';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
} from '@app/common/generated/auth';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { ClientGrpc } from '@nestjs/microservices';
import { createAuthMetadata } from '../utils/create-auth-metadata.util';
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

  async register(data: RegisterUserRequestDto) {
    return firstValueFrom(this.authGrpcService.register(data));
  }

  async resendVerificationLink(data: ResendVerificationLinkRequestDto) {
    return firstValueFrom(this.authGrpcService.resendVerificationLink(data));
  }

  async verifyEmail(data: VerifyEmailRequestDto) {
    return firstValueFrom(this.authGrpcService.verifyEmail(data));
  }

  async login(data: LoginUserRequestDto) {
    return firstValueFrom(this.authGrpcService.login(data));
  }

  async validateSocialUser(data: ValidateSocialUserRequestDto) {
    return firstValueFrom(this.authGrpcService.validateSocialUser(data));
  }

  async forgotPassword(data: ForgotPasswordRequestDto) {
    return firstValueFrom(this.authGrpcService.forgotPassword(data));
  }

  async resetPassword(data: ResetPasswordRequestDto) {
    return firstValueFrom(this.authGrpcService.resetPassword(data));
  }

  async changePassword(data: ChangePasswordRequestDto, authHeader: string) {
    const metadata = createAuthMetadata(authHeader);
    return firstValueFrom(this.authGrpcService.changePassword(data, metadata));
  }

  async refreshAccessToken(data: RefreshAccessTokenRequestDto) {
    return firstValueFrom(this.authGrpcService.refreshAccessToken(data));
  }

  whoAmI(authHeader: string) {
    const metadata = createAuthMetadata(authHeader);
    return this.authGrpcService.whoAmI({}, metadata);
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
          // secure: true,
          secure: false,
          maxAge: ms(accessTokenExp as StringValue),
        },
      },
      refresh: {
        name: 'refreshToken',
        value: refreshToken,
        options: {
          httpOnly: true,
          // secure: true,
          secure: false,
          maxAge: ms(refreshTokenExp as StringValue),
        },
      },
    };

    // res.cookie('is_auth', true, {
    //   httpOnly: false,
    //   maxAge: Number(refreshTokenExp),
    // });
  }

  isTokenExpired(token: string, secret: string): boolean {
    try {
      this.jwtService.verify(token, {
        secret,
        clockTolerance: 10,
      });
      return false;
    } catch (error) {
      // If decoding fails (malformed token), treat it as expired
      return true;
    }
  }
}
