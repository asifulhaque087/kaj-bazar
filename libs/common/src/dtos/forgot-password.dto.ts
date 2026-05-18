import { IsString } from 'class-validator';
import { ForgotPasswordBody } from '@app/common/generated/auth';

export class ForgotPasswordDto implements ForgotPasswordBody {
  @IsString()
  email!: string;
}
