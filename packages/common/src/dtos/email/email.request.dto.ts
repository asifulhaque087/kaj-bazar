import { IsString, IsOptional, IsUrl } from 'class-validator';

export class SendEmailEventRequestDto {
  @IsString()
  receiver!: string;

  @IsString()
  templateName!: string;

  @IsString()
  username!: string;

  @IsUrl()
  @IsOptional()
  verifyLink?: string;

  @IsString()
  @IsOptional()
  otp?: string;

  @IsString()
  @IsOptional()
  subject?: string;

  @IsUrl()
  @IsOptional()
  resetLink?: string;
}