import { Controller, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  RefreshAccessTokenBody,
} from '@app/common/generated/auth';
import { Payload } from '@nestjs/microservices';
import {
  type AuthGrpcRequest,
  ChangePasswordRequestDto,
  ForgotPasswordRequestDto,
  GrpcGuard,
  LoginUserRequestDto,
  RefreshAccessTokenRequestDto,
  RegisterUserRequestDto,
  ResendVerificationLinkRequestDto,
  ResetPasswordRequestDto,
  ValidateSocialUserRequestDto,
  VerifyEmailRequestDto,
} from '@app/common';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  async register(@Payload() data: RegisterUserRequestDto) {
    return this.authService.register(data);
  }

  async resendVerificationLink(
    @Payload() data: ResendVerificationLinkRequestDto,
  ) {
    return this.authService.resendVerificationLink(data);
  }

  async verifyEmail(@Payload() data: VerifyEmailRequestDto) {
    return this.authService.verifyEmail(data);
  }

  async login(@Payload() data: LoginUserRequestDto) {
    return this.authService.login(data);
  }

  async validateSocialUser(@Payload() data: ValidateSocialUserRequestDto) {
    // return this.authService.validateSocialUser(data);
    const user = this.authService.validateSocialUser(data);

    console.log(
      '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ auth => auth controller',
      data,
    );
    return user;
  }

  async forgotPassword(@Payload() data: ForgotPasswordRequestDto) {
    return this.authService.forgotPassword(data);
  }

  async resetPassword(@Payload() data: ResetPasswordRequestDto) {
    return this.authService.resetPassword(data);
  }

  @UseGuards(GrpcGuard)
  async changePassword(@Payload() data: ChangePasswordRequestDto) {
    return this.authService.changePassword(data);
  }

  @UseGuards(GrpcGuard)
  async whoAmI(@Payload() data: AuthGrpcRequest) {
    return this.authService.whoAmI(data);
  }

  async refreshAccessToken(data: RefreshAccessTokenRequestDto) {
    return this.authService.refreshAccessToken(data);
  }
}
