import { ResetPasswordBody } from '@app/common/generated/auth';
import { IsString } from 'class-validator';

export class ResetPasswordDto implements ResetPasswordBody {
  @IsString()
  token!: string;

  @IsString()
  password!: string;
}
