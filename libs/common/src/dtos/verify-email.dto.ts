import { IsString } from 'class-validator';
import { VerifyEmailBody } from '@app/common/generated/auth';

export class VerifyEmailDto implements VerifyEmailBody {
  @IsString()
  token!: string;
}
