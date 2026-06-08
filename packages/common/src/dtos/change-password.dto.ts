import { ChangePasswordBody } from '@app/common/generated/auth';
import { IsString } from 'class-validator';

export class ChangePasswordDto implements ChangePasswordBody {
  @IsString()
  email!: string;

  @IsString()
  password!: string;
}
