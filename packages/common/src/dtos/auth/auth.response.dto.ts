import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RegisterResponse } from '@app/common/generated/auth';

export class RegisterUserResponseDto implements RegisterResponse {
  @ApiProperty({
    description: 'Unique user identifier',
    example: '60d5ecb8b3b9b21234567890',
  })
  id!: string;

  @ApiProperty({
    description: 'Username of the registered user',
    example: 'john_doe',
  })
  username!: string;

  @ApiProperty({
    description: 'Email address of the registered user',
    example: 'john@example.com',
  })
  email!: string;

  @ApiPropertyOptional({
    description: 'Country of the user',
    example: 'Bangladesh',
  })
  country?: string;

  @ApiPropertyOptional({
    description: 'URL to the profile picture',
    example: 'https://example.com/avatar.jpg',
  })
  profilePicture?: string;

  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken!: string;

  @ApiProperty({
    description: 'JWT refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken!: string;
}
