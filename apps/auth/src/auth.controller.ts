import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  type RegisterReq,
} from '@app/common/generated/auth';
import { Payload } from '@nestjs/microservices';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async register(@Payload() data: RegisterReq) {
    return { email: data.email };
    // return this.authService.getHello();
  }
}
