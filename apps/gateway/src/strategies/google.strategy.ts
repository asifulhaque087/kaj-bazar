import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { ValidateSocialUserRequestDto } from '@app/common';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    // done: VerifyCallback,
  ): Promise<AuthTokens> {
    const { id, displayName, emails, photos, provider } = profile;

    // 1. Handle potential undefined values safely
    const email = emails && emails.length > 0 ? emails[0].value : null;
    const photo = photos && photos.length > 0 ? photos[0].value : '';

    // 2. Validate that we actually got an email (since your DTO requires it)
    if (!email) {
      throw new UnauthorizedException(
        'No email associated with this Google account',
      );
    }

    // 3. Construct the DTO object
    const socialUserDto: ValidateSocialUserRequestDto = {
      username: displayName || id,
      provider: provider,
      email: email,
      profilePicture: photo,
    };

    // 4. Pass the DTO to your service
    const { accessToken, refreshToken } =
      await this.authService.validateSocialUser(socialUserDto);

    return {
      accessToken,
      refreshToken,
    };

    // return tokens;

    // done(null, tokens);
  }
}
