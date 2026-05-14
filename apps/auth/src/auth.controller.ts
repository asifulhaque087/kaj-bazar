import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  RefreshAccessTokenBody,
} from '@app/common/generated/auth';
import { Payload } from '@nestjs/microservices';
import {
  LoginUserDto,
  RegisterUserDto,
  ValidateSocialUserDto,
} from '@app/common';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  async register(@Payload() data: RegisterUserDto) {
    return this.authService.register(data);
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

  async refreshAccessToken(request: RefreshAccessTokenBody) {
    return {
      newAccessToken: 'dummy-access-token',
      newAccessTokenExp: '',
      newRefreshToken: 'dummy-refresh-token',
      newRefreshTokenExp: '',
    };
  }
}
