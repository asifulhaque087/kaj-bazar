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
} from '../generated/user';
import { Type } from 'class-transformer';

export class SellerByIdDto implements FindByIdRequest {
  @IsString()
  id!: string;
}

export class SellerByNameDto implements FindByNameRequest {
  @IsString()
  username!: string;
}

export class LanguageDto implements Language {
  @IsString()
  id!: string;

  @IsString()
  language!: string;

  @IsString()
  level!: string;
}

export class SkillDto implements Skill {
  @IsString()
  id!: string;

  @IsString()
  name!: string;
}

export class ExperienceDto implements Experience {
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

export class EducationDto implements Education {
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

export class SocialLinkDto implements SocialLink {
  @IsString()
  id!: string;

  @IsString()
  platform!: string;

  @IsString()
  link!: string;
}

export class CertificateDto implements Certificate {
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

export class CreateSellerDto implements CreateSellerRequest {
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
  @Type(() => LanguageDto)
  languages!: LanguageDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  skills!: SkillDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experience!: ExperienceDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education!: EducationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialLinkDto)
  socialLinks!: SocialLinkDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificateDto)
  certificates!: CertificateDto[];
}

export class IdPayloadDto implements IdPayload {
  @IsString()
  id!: string;
}

export class UpdateSellerDto implements UpdateSellerRequest {
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
  @Type(() => LanguageDto)
  languages!: LanguageDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  skills!: SkillDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experience!: ExperienceDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education!: EducationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialLinkDto)
  socialLinks!: SocialLinkDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificateDto)
  certificates!: CertificateDto[];

  // Tracking deletions required by your service's tx logic
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IdPayloadDto)
  removedLangIds!: IdPayloadDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IdPayloadDto)
  removedSkillIds!: IdPayloadDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IdPayloadDto)
  removedExperienceIds!: IdPayloadDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IdPayloadDto)
  removedEducationIds!: IdPayloadDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IdPayloadDto)
  removedSocialLinkIds!: IdPayloadDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IdPayloadDto)
  removedCertificateIds!: IdPayloadDto[];
}
