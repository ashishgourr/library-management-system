import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsBoolean()
  @IsOptional()
  available?: boolean;
}
