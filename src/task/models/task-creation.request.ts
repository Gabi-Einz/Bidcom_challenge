import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsIn,
} from 'class-validator';

export class TaskCreationRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  completed: boolean;

  @IsString()
  @IsIn(['low', 'medium', 'high'])
  priority: 'low' | 'medium' | 'high';
}
