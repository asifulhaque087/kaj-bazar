import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  LoginResponse,
  RefreshAccessTokenBody,
  RefreshAccessTokenResponse,
} from '@app/common/generated/auth';
import { Payload } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from '@app/common';
import { Observable } from 'rxjs';

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

  async refreshAccessToken(request: RefreshAccessTokenBody) {
    return {
      newAccessToken: 'dummy-access-token',
      newAccessTokenExp: '',
      newRefreshToken: 'dummy-refresh-token',
      newRefreshTokenExp: '',
    };
  }
}
