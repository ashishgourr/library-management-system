import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateBookDto {
  @ApiPropertyOptional({
    description: 'Updated title of the book',
    example: 'To Kill a Mockingbird',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Updated author of the book',
    example: 'Harper Lee',
  })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiPropertyOptional({
    description: 'Updated availability status of the book',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  available?: boolean;
}
