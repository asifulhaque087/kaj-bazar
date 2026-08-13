import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ChangePasswordBody,
  ForgotPasswordBody,
  LoginBody,
  RefreshAccessTokenBody,
  RegisterBody,
  ResendVerificationLinkBody,
  ResetPasswordBody,
  ValidateSocialUserBody,
  VerifyEmailBody,
} from '@app/common/generated/auth';

export class RegisterUserRequestDto implements RegisterBody {
  @ApiProperty({
    description: 'Desired username for the new account',
    example: 'john_doe',
  })
  @IsString()
  username!: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john@example.com',
  })
  @IsString()
  email!: string;

  @ApiProperty({
    description: 'Password for the account',
    example: 'P@ssw0rd123',
  })
  @IsString()
  password!: string;

  @ApiPropertyOptional({
    description: 'Country of the user',
    example: 'Bangladesh',
  })
  @IsString()
  @IsOptional()
  country!: string;

  @ApiPropertyOptional({
    description: 'URL to the profile picture',
    example: 'https://example.com/avatar.jpg',
  })
  @IsString()
  @IsOptional()
  profilePicture?: string;
}

export class LoginUserRequestDto implements LoginBody {
  @ApiProperty({
    description: 'Registered email address',
    example: 'john@example.com',
  })
  @IsString()
  email!: string;

  @ApiProperty({ description: 'Account password', example: 'P@ssw0rd123' })
  @IsString()
  password!: string;
}

export class RefreshAccessTokenRequestDto implements RefreshAccessTokenBody {
  @IsString()
  token!: string;
}

export class ForgotPasswordRequestDto implements ForgotPasswordBody {
  @ApiProperty({
    description: 'Email address to send reset link to',
    example: 'john@example.com',
  })
  @IsString()
  email!: string;
}

export class ChangePasswordRequestDto implements ChangePasswordBody {
  @ApiProperty({
    description: 'Email address of the account',
    example: 'john@example.com',
  })
  @IsString()
  email!: string;

  @ApiProperty({ description: 'New password to set', example: 'NewP@ssw0rd!' })
  @IsString()
  password!: string;
}

export class ResendVerificationLinkRequestDto implements ResendVerificationLinkBody {
  @ApiProperty({
    description: 'Email address to resend verification link to',
    example: 'john@example.com',
  })
  @IsString()
  email!: string;
}

export class ResetPasswordRequestDto implements ResetPasswordBody {
  @ApiProperty({
    description: 'Password reset token received via email',
    example: 'eyJhbGciOiJIUzI1NiIs...',
  })
  @IsString()
  token!: string;

  @ApiProperty({ description: 'New password to set', example: 'NewP@ssw0rd!' })
  @IsString()
  password!: string;
}

export class ValidateSocialUserRequestDto implements ValidateSocialUserBody {
  @IsString()
  username!: string;

  @IsString()
  provider!: string;

  @IsString()
  email!: string;

  @IsString()
  @IsOptional()
  profilePicture!: string;
}

export class VerifyEmailRequestDto implements VerifyEmailBody {
  @ApiProperty({
    description: 'Email verification token',
    example: 'eyJhbGciOiJIUzI1NiIs...',
  })
  @IsString()
  token!: string;
}
