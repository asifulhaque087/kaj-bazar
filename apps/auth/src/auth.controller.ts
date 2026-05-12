import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  RefreshAccessTokenBody,
  RefreshAccessTokenResponse,
} from '@app/common/generated/auth';
import { Payload } from '@nestjs/microservices';
import { RegisterUserDto } from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  async register(@Payload() data: RegisterUserDto) {
    return this.authService.register(data);

    console.log('@@@@@@@@@@ auth auth controller @@@@@@@@@');

    return {
      ...data,
      accessToken: 'dummy-access-token', // Added
      refreshToken: 'dummy-refresh-token', // Added
      id: 'some-unique-id', // Added
    };

    return {
      id: 'some-unique-id', // Added
      username: 'asiful_dev',
      email: 'mridul@example.com',
      password: 'SecurePassword123!',
      country: 'Bangladesh',
      profilePicture: 'https://example.com/images/avatar-01.png',
      accessToken: 'dummy-access-token', // Added
      refreshToken: 'dummy-refresh-token', // Added
    };

    // return {
    //   username: 'asiful_dev',
    //   email: 'mridul@example.com',
    //   password: 'SecurePassword123!',
    //   country: 'Bangladesh',
    //   profilePicture: 'https://example.com/images/avatar-01.png',
    // };
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
