import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  Certificate,
  CreateSellerRequest,
  Education,
  Experience,
  FindByIdRequest,
  FindByNameRequest,
  IdPayload,
  Language,
  Skill,
  SocialLink,
  UpdateSellerRequest,
} from '@app/common/generated/user';
import { Type } from 'class-transformer';

export class SellerByIdRequestDto implements FindByIdRequest {
  @IsString()
  id!: string;
}

export class SellerByNameRequestDto implements FindByNameRequest {
  @IsString()
  username!: string;
}

export class LanguageRequestDto implements Language {
  @IsString()
  id!: string;

  @IsString()
  language!: string;

  @IsString()
  level!: string;
}

export class SkillRequestDto implements Skill {
  @IsString()
  id!: string;

  @IsString()
  name!: string;
}

export class ExperienceRequestDto implements Experience {
  @IsString()
  id!: string;

  @IsString()
  company!: string;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  currentlyWorkingHere!: boolean;
}

export class EducationRequestDto implements Education {
  @IsString()
  id!: string;

  @IsString()
  university!: string;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  major?: string;

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsString()
  country?: string;
}

export class SocialLinkRequestDto implements SocialLink {
  @IsString()
  id!: string;

  @IsString()
  platform!: string;

  @IsString()
  link!: string;
}

export class CertificateRequestDto implements Certificate {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  year?: string;
}

// ==========================================
// MAIN CREATE SELLER DTO
// ==========================================

export class CreateSellerRequestDto implements CreateSellerRequest {
  @IsString()
  id!: string;

  @IsString()
  fullName!: string;

  @IsString()
  username!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  oneliner?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageRequestDto)
  languages!: LanguageRequestDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillRequestDto)
  skills!: SkillRequestDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceRequestDto)
  experience!: ExperienceRequestDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationRequestDto)
  education!: EducationRequestDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialLinkRequestDto)
  socialLinks!: SocialLinkRequestDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificateRequestDto)
  certificates!: CertificateRequestDto[];
}

export class IdPayloadRequestDto implements IdPayload {
  @IsString()
  id!: string;
}

export class UpdateSellerRequestDto implements UpdateSellerRequest {
  @IsString()
  id!: string;

  @IsString()
  fullName!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  oneliner?: string;

  // Array payloads for records to create or update
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageRequestDto)
  languages!: LanguageRequestDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillRequestDto)
  skills!: SkillRequestDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceRequestDto)
  experience!: ExperienceRequestDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationRequestDto)
  education!: EducationRequestDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialLinkRequestDto)
  socialLinks!: SocialLinkRequestDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificateRequestDto)
  certificates!: CertificateRequestDto[];

  // Tracking deletions required by your service's tx logic
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IdPayloadRequestDto)
  removedLangIds!: IdPayloadRequestDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IdPayloadRequestDto)
  removedSkillIds!: IdPayloadRequestDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IdPayloadRequestDto)
  removedExperienceIds!: IdPayloadRequestDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IdPayloadRequestDto)
  removedEducationIds!: IdPayloadRequestDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IdPayloadRequestDto)
  removedSocialLinkIds!: IdPayloadRequestDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IdPayloadRequestDto)
  removedCertificateIds!: IdPayloadRequestDto[];
}
