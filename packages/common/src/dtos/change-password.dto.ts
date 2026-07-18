import { ChangePasswordBody } from '@app/common/generated/auth';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto implements ChangePasswordBody {
  @ApiProperty({ description: 'Email address of the account', example: 'john@example.com' })
  @IsString()
  email!: string;

  @ApiProperty({ description: 'New password to set', example: 'NewP@ssw0rd!' })
  @IsString()
  password!: string;
}
