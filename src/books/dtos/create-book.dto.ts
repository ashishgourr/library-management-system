import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsBoolean()
  @IsOptional()
  available: boolean;
}
