import { LoginUserDto, RegisterUserDto } from '@app/common';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'apps/gateway/src/auth/auth.service';
import { GetUser } from 'apps/gateway/src/decorators/get-user.decorator';
import { AccessTokenGuard } from 'apps/gateway/src/guards/access-token.guard';
import type { AuthTokens } from 'apps/gateway/src/strategies/google.strategy';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() body: RegisterUserDto,
  ) {
    const user = await this.authService.register(body);

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

  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() body: LoginUserDto,
  ) {
    const user = await this.authService.login(body);

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
  async googleAuthRedirect(
    @GetUser() tokens: AuthTokens, // Type-safe tokens!
    @Res() res: Response,
  ) {
    // 1. Get data from service
    const cookieSettings = this.authService.getCookieSettings(
      tokens.accessToken,
      tokens.refreshToken,
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

    return res.redirect(
      `${this.configService.getOrThrow<string>('CLIENT_URL')}/user/profile`,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Get('who-am-i')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
