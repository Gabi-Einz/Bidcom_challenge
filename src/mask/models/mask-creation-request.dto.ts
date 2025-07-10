import { IsString, IsNotEmpty } from 'class-validator';

export class MaskCreationRequestDto {
  @IsString()
  @IsNotEmpty()
  url: string;
}
