import { IsString } from 'class-validator';
import { RefreshAccessTokenBody } from '../generated/auth';

export class RefreshAccessTokenDto implements RefreshAccessTokenBody {
  @IsString()
  token!: string;
}
