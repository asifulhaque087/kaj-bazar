import { RegisterUserDto } from '@app/common';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'apps/gateway/src/auth/auth.service';
import { AccessTokenGuard } from 'apps/gateway/src/guards/access-token.guard';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async register(@Body() body: RegisterUserDto) {
    console.log('@@@@@@@@@@ auth controller of gateway service @@@@@@@@@');
    return this.authService.register(body);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // req.user contains the tokens returned from GoogleStrategy.validate

    this.authService.setCookies(res, 'sadlkfasd', '2983sd');
    return res.redirect(`${process.env.FRONTEND_HOST}/user/profile`);
  }

  @UseGuards(AccessTokenGuard)
  @Get('who-am-i')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
