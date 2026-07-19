import { IsOptional, IsString } from 'class-validator';
import { RegisterBody } from '../generated/auth';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterUserDto implements RegisterBody {
  @ApiProperty({ description: 'Desired username for the new account', example: 'john_doe' })
  @IsString()
  username!: string;

  @ApiProperty({ description: 'Email address of the user', example: 'john@example.com' })
  @IsString()
  email!: string;

  @ApiProperty({ description: 'Password for the account', example: 'P@ssw0rd123' })
  @IsString()
  password!: string;

  @ApiPropertyOptional({ description: 'Country of the user', example: 'Bangladesh' })
  @IsString()
  @IsOptional()
  country!: string;

  @ApiPropertyOptional({ description: 'URL to the profile picture', example: 'https://example.com/avatar.jpg' })
  @IsString()
  @IsOptional()
  profilePicture?: string
}
