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
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() body: RegisterUserDto,
  ) {
    console.log('@@@@@@@@@@ auth controller of gateway service @@@@@@@@@');

    // return this.authService.register(body);
    const user = await this.authService.register(body);
    // const user = this.authService.register(body);
    // return user;

    const cookieSettings = this.authService.getCookieSettings(
      user.accessToken,
      user.refreshToken,
    );

    res.cookie(
      cookieSettings.access.name,
      cookieSettings.access.value,
      cookieSettings.access.options,
    );
    res.cookie(
      cookieSettings.refresh.name,
      cookieSettings.refresh.value,
      cookieSettings.refresh.options,
    );
    return user;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // 1. Get data from service
    const cookieSettings = this.authService.getCookieSettings(
      'token_val',
      'refresh_val',
    );

    // 2. Handle HTTP-specific response actions
    res.cookie(
      cookieSettings.access.name,
      cookieSettings.access.value,
      cookieSettings.access.options,
    );
    res.cookie(
      cookieSettings.refresh.name,
      cookieSettings.refresh.value,
      cookieSettings.refresh.options,
    );

    return res.redirect(`${process.env.FRONTEND_HOST}/user/profile`);
  }

  @UseGuards(AccessTokenGuard)
  @Get('who-am-i')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
