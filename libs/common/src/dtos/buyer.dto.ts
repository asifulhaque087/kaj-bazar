import { IsOptional, IsString } from 'class-validator';
import { FindByIdRequest, FindByNameRequest } from '@app/common/generated/user';

export class BuyerByIdDto implements FindByIdRequest {
  @IsString()
  id!: string;
}

export class BuyerByNameDto implements FindByNameRequest {
  @IsString()
  username!: string;
}

export class RegisterBuyerDto {
  @IsString()
  id!: string;

  @IsString()
  username!: string;

  @IsString()
  email!: string;

  @IsString()
  @IsOptional()
  country!: string | null;

  @IsString()
  @IsOptional()
  profilePicture?: string | null;
}
