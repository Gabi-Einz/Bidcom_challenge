import { IsNotEmpty, IsString } from 'class-validator';

export class TokenRequest {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
