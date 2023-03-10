import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { FormatString } from 'src/utils/formatString';

import { SearchMovieDto } from './dto/search-movies-by-name.dto';
import { MoviesData, MoviesResponse } from './movies.interface';

@Injectable()
export class MoviesService {
  private baseURL = `https://www.omdbapi.com/?&apikey=${process.env.omdbApiKey}`;

  constructor(private readonly httpService: HttpService) {}
  async findAllByName({ name, page }: SearchMovieDto): Promise<MoviesResponse> {
    const movieName = new FormatString(name, ' ', '+').format();
    const url = `${this.baseURL}&s=${movieName}&page=${page}`;
    const {
      data: { Search, totalResults, Response },
    } = await firstValueFrom(
      this.httpService.get<MoviesData>(url).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    if (Response === 'False') {
      throw new Error('Movie not founded');
    }
    const totalResult = Number(totalResults);
    const pages =
      Math.floor(totalResult / 10) + (totalResult % 10 !== 0 ? 1 : 0);
    return { Search, totalResult, pages };
  }
}
