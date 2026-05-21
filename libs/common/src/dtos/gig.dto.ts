import {
  SearchRequest,
  FindByIdRequest,
  SellerGigsRequest,
  CreateGigRequest,
  UpdateGigRequest,
  SeedGigsRequest,
  SubCategory,
  Tag,
} from '@app/common/generated/gig';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsEmail,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

// Sub-messages nested structures
export class SubCategoryDto implements SubCategory {
  @IsString()
  @IsNotEmpty()
  title!: string;
}

export class TagDto implements Tag {
  @IsString()
  @IsNotEmpty()
  title!: string;
}

// 1. Search Method
export class SearchGigDto implements SearchRequest {
  @IsOptional()
  @IsString()
  minPrice?: string;

  @IsOptional()
  @IsString()
  maxPrice?: string;

  @IsOptional()
  @IsString()
  deliveryTime?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  searchKey?: string;

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  limit?: string;
}

// 2. FindById Method
export class GigByIdDto implements FindByIdRequest {
  @IsUUID()
  @IsNotEmpty()
  id!: string;
}

// 3. SellerGigs Method
export class SellerGigsDto implements SellerGigsRequest {
  @IsUUID()
  @IsNotEmpty()
  sellerId!: string;

  // Your code handles this explicitly as a string: data.activeGigs === 'true'
  @IsOptional()
  @IsString()
  activeGigs?: string;
}

// 4. Create Method
export class CreateGigDto implements CreateGigRequest {
  @IsUUID()
  @IsNotEmpty()
  sellerId!: string;

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  profilePicture!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  basicTitle!: string;

  @IsString()
  @IsNotEmpty()
  basicDescription!: string;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubCategoryDto)
  subCategories!: SubCategoryDto[];

  @IsString()
  @IsNotEmpty()
  expectedDelivery!: string;

  @IsString()
  @IsNotEmpty()
  coverImage!: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TagDto)
  tags!: TagDto[];
}

// 5. Update Method
export class UpdateGigDto implements UpdateGigRequest {
  @IsUUID()
  @IsNotEmpty()
  id!: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  basicTitle?: string;

  @IsOptional()
  @IsString()
  basicDescription?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubCategoryDto)
  subCategories!: SubCategoryDto[];

  @IsOptional()
  @IsString()
  expectedDelivery?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TagDto)
  tags!: TagDto[];

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

// 6. SeedGigs Method
export class SeedGigsDto implements SeedGigsRequest {
  @IsOptional()
  @IsString()
  count?: string;
}
