import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class MaskCreationRequestDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
