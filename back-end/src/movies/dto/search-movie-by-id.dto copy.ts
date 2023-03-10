import { IsNotEmpty, IsString } from 'class-validator';

export class MovieIdDto {
  @IsString()
  @IsNotEmpty()
  imdbId: string;
}
