import { IsString } from 'class-validator';
import { FindByIdRequest, FindByNameRequest } from '@app/common/generated/user';

export class SellerByIdDto implements FindByIdRequest {
  @IsString()
  id!: string;
}

export class SellerByNameDto implements FindByNameRequest {
  @IsString()
  username!: string;
}
