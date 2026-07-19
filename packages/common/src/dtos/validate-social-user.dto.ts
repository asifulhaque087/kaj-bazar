import { IsOptional, IsString } from 'class-validator';
import { ValidateSocialUserBody } from '../generated/auth';

export class ValidateSocialUserDto implements ValidateSocialUserBody {
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
