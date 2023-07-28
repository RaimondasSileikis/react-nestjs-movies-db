import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditMovieDto {
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsOptional()
  overview?: string;

  @IsString()
  @IsOptional()
  homepage?: string;

  @IsString()
  @IsOptional()
  imgUrl: string;

  @IsString()
  @IsNotEmpty()
  genre: string;
}
