import { IsString } from 'class-validator';
import { RefreshAccessTokenBody } from '@app/common/generated/auth';

export class RefreshAccessTokenDto implements RefreshAccessTokenBody {
  @IsString()
  token!: string;
}
