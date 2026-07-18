import { ResetPasswordBody } from '@app/common/generated/auth';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto implements ResetPasswordBody {
  @ApiProperty({ description: 'Password reset token received via email', example: 'eyJhbGciOiJIUzI1NiIs...' })
  @IsString()
  token!: string;

  @ApiProperty({ description: 'New password to set', example: 'NewP@ssw0rd!' })
  @IsString()
  password!: string;
}
