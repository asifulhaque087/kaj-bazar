import { IsString } from 'class-validator';
import { VerifyEmailBody } from '@app/common/generated/auth';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto implements VerifyEmailBody {
  @ApiProperty({ description: 'Email verification token', example: 'eyJhbGciOiJIUzI1NiIs...' })
  @IsString()
  token!: string;
}
