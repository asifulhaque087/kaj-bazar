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
  ChangePasswordDto,
  ForgotPasswordDto,
  GrpcGuard,
  LoginUserDto,
  RegisterUserDto,
  ResendVerificationLinkDto,
  ResetPasswordDto,
  ValidateSocialUserDto,
  VerifyEmailDto,
} from '@app/common';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  async register(@Payload() data: RegisterUserDto) {
    return this.authService.register(data);
  }

  async resendVerificationLink(@Payload() data: ResendVerificationLinkDto) {
    return this.authService.resendVerificationLink(data);
  }

  async verifyEmail(@Payload() data: VerifyEmailDto) {
    return this.authService.verifyEmail(data);
  }

  async login(@Payload() data: LoginUserDto) {
    return this.authService.login(data);
  }

  async validateSocialUser(@Payload() data: ValidateSocialUserDto) {
    // return this.authService.validateSocialUser(data);
    const user = this.authService.validateSocialUser(data);

    console.log(
      '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ auth => auth controller',
      data,
    );
    return user;
  }

  async forgotPassword(@Payload() data: ForgotPasswordDto) {
    return this.authService.forgotPassword(data);
  }

  async resetPassword(@Payload() data: ResetPasswordDto) {
    return this.authService.resetPassword(data);
  }

  @UseGuards(GrpcGuard)
  async changePassword(@Payload() data: ChangePasswordDto) {
    return this.authService.changePassword(data);
  }

  @UseGuards(GrpcGuard)
  async whoAmI(@Payload() data: AuthGrpcRequest) {
    return this.authService.whoAmI(data);
  }

  async refreshAccessToken(request: RefreshAccessTokenBody) {
    return {
      newAccessToken: 'dummy-access-token',
      newAccessTokenExp: '',
      newRefreshToken: 'dummy-refresh-token',
      newRefreshTokenExp: '',
    };
  }
}
