import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class SearchMovieDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1)
  page: string;
}
