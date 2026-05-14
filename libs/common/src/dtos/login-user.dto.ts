import { IsString } from 'class-validator';
import { LoginBody } from '@app/common/generated/auth';

export class LoginUserDto implements LoginBody {
  @IsString()
  email!: string;

  @IsString()
  password!: string;
}
