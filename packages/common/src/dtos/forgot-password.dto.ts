import { IsString } from 'class-validator';
import { ForgotPasswordBody } from '../generated/auth';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto implements ForgotPasswordBody {
  @ApiProperty({ description: 'Email address to send reset link to', example: 'john@example.com' })
  @IsString()
  email!: string;
}
