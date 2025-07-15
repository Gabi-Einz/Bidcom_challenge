import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MaskCreationRequestDto {
  @ApiProperty({
    description: 'The original URL to be masked',
    example: 'https://www.google.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'Optional password to protect the masked URL',
    example: 'mySecretPassword123',
    required: false,
  })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({
    description: 'Optional expiration date for the mask (ISO 8601 format)',
    example: '2025-12-31T23:59:59.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
