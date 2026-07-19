import { IsString } from 'class-validator';
import { ResendVerificationLinkBody } from '../generated/auth';
import { ApiProperty } from '@nestjs/swagger';

export class ResendVerificationLinkDto implements ResendVerificationLinkBody {
  @ApiProperty({ description: 'Email address to resend verification link to', example: 'john@example.com' })
  @IsString()
  email!: string;
}
