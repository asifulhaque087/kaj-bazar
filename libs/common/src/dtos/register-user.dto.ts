import { IsString } from 'class-validator';
import { RegisterBody } from '@app/common/generated/auth';

export class RegisterUserDto implements RegisterBody {
  @IsString()
  username!: string;

  @IsString()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  country!: string;

  @IsString()
  profilePicture!: string;
}
