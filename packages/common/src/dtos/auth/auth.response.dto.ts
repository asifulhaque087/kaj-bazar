import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  CommonResponse,
  LoginResponse,
  RefreshAccessTokenResponse,
  RegisterResponse,
  User,
  ValidateSocialUserResponse,
} from '@app/common/generated/auth';

export class RegisterUserResponseDto implements RegisterResponse {
  @ApiProperty({
    description: 'Unique user identifier',
    example: '60d5ecb8b3b9b21234567890',
  })
  id!: string;

  @ApiProperty({
    description: 'Username of the registered user',
    example: 'john_doe',
  })
  username!: string;

  @ApiProperty({
    description: 'Email address of the registered user',
    example: 'john@example.com',
  })
  email!: string;

  @ApiPropertyOptional({
    description: 'Country of the user',
    example: 'Bangladesh',
  })
  country?: string;

  @ApiPropertyOptional({
    description: 'URL to the profile picture',
    example: 'https://example.com/avatar.jpg',
  })
  profilePicture?: string;

  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken!: string;

  @ApiProperty({
    description: 'JWT refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken!: string;
}

export class LoginUserResponseDto implements LoginResponse {
  @ApiProperty({
    description: 'Unique user identifier',
    example: '60d5ecb8b3b9b21234567890',
  })
  id!: string;

  @ApiProperty({
    description: 'Username of the user',
    example: 'john_doe',
  })
  username!: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john@example.com',
  })
  email!: string;

  @ApiPropertyOptional({
    description: 'Country of the user',
    example: 'Bangladesh',
  })
  country?: string;

  @ApiPropertyOptional({
    description: 'URL to the profile picture',
    example: 'https://example.com/avatar.jpg',
  })
  profilePicture?: string;

  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken!: string;

  @ApiProperty({
    description: 'JWT refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken!: string;
}

export class CommonResponseDto implements CommonResponse {
  @ApiProperty({
    description: 'Response message',
    example: 'Operation completed successfully',
  })
  message!: string;
}

export class ResendVerificationLinkResponseDto extends CommonResponseDto {}
export class VerifyEmailResponseDto extends CommonResponseDto {}
export class ForgotPasswordResponseDto extends CommonResponseDto {}
export class ResetPasswordResponseDto extends CommonResponseDto {}
export class ChangePasswordResponseDto extends CommonResponseDto {}

export class WhoAmIResponseDto implements User {
  @ApiProperty({
    description: 'Unique user identifier',
    example: '60d5ecb8b3b9b21234567890',
  })
  id!: string;

  @ApiProperty({
    description: 'Username of the user',
    example: 'john_doe',
  })
  username!: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john@example.com',
  })
  email!: string;

  @ApiPropertyOptional({
    description: 'Country of the user',
    example: 'Bangladesh',
  })
  country?: string;

  @ApiPropertyOptional({
    description: 'URL to the profile picture',
    example: 'https://example.com/avatar.jpg',
  })
  profilePicture?: string;

  @ApiProperty({
    description: 'Whether the user email is verified',
    example: true,
  })
  emailVerified!: boolean;
}

export class RefreshAccessTokenResponseDto implements RefreshAccessTokenResponse {
  @ApiProperty({
    description: 'New JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  newAccessToken!: string;

  @ApiProperty({
    description: 'New JWT refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  newRefreshToken!: string;
}

export class ValidateSocialUserResponseDto implements ValidateSocialUserResponse {
  @ApiProperty({
    description: 'Unique user identifier',
    example: '60d5ecb8b3b9b21234567890',
  })
  id!: string;

  @ApiProperty({
    description: 'Username of the user',
    example: 'john_doe',
  })
  username!: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john@example.com',
  })
  email!: string;

  @ApiPropertyOptional({
    description: 'Country of the user',
    example: 'Bangladesh',
  })
  country?: string;

  @ApiPropertyOptional({
    description: 'URL to the profile picture',
    example: 'https://example.com/avatar.jpg',
  })
  profilePicture?: string;

  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken!: string;

  @ApiProperty({
    description: 'JWT refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken!: string;
}
