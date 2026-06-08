import { IsString } from 'class-validator';
import { ResendVerificationLinkBody } from '@app/common/generated/auth';

export class ResendVerificationLinkDto implements ResendVerificationLinkBody {
  @IsString()
  email!: string;
}
