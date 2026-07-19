import { IsString } from 'class-validator';
import { LoginBody } from '../generated/auth';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto implements LoginBody {
  @ApiProperty({ description: 'Registered email address', example: 'john@example.com' })
  @IsString()
  email!: string;

  @ApiProperty({ description: 'Account password', example: 'P@ssw0rd123' })
  @IsString()
  password!: string;
}
