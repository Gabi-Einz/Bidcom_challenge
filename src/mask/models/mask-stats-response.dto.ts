import { ApiProperty } from '@nestjs/swagger';
import { MaskEntity } from '../entities/mask.entity';

export class MaskStatsResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the mask',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The original URL that was masked',
    example: 'https://www.google.com',
  })
  target: string;

  @ApiProperty({
    description: 'The generated masked URL',
    example: 'http://localhost:3000/l/abc123',
  })
  link: string;

  @ApiProperty({
    description: 'Whether the mask is currently valid/active',
    example: true,
  })
  valid: boolean;

  @ApiProperty({
    description: 'Number of times the mask has been accessed',
    example: 42,
  })
  redirectAmount: number;

  @ApiProperty({
    description: 'Date and time when the mask was created',
    example: '2025-01-07T10:30:46.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the mask expires (null if no expiration)',
    example: '2025-12-31T23:59:59.000Z',
    nullable: true,
  })
  expiresAt: Date | null;

  static build = (mask: MaskEntity): MaskStatsResponseDto => {
    const response = new MaskStatsResponseDto();
    response.id = mask.id;
    response.target = mask.target;
    response.link = mask.link;
    response.valid = mask.valid;
    response.redirectAmount = mask.redirectAmount;
    response.createdAt = mask.createdAt;
    response.expiresAt = mask.expiresAt;
    return response;
  };
}
