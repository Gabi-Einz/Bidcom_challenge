import { MaskEntity } from '../entities/mask.entity';
import { ApiProperty } from '@nestjs/swagger';

export class MaskCreationResponseDto {
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

  static build(mask: MaskEntity): MaskCreationResponseDto {
    const response = new MaskCreationResponseDto();
    response.id = mask.id;
    response.target = mask.target;
    response.link = mask.link;
    response.valid = mask.valid;
    return response;
  }
}
