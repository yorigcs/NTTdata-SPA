import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { FormatString } from 'src/utils/formatString';
import { MovieIdDto } from './dto/search-movie-by-id.dto copy';

import { SearchMovieDto } from './dto/search-movies-by-name.dto';
import { MoviesSearchData, MoviesSearchResponse } from './movies.search.interface';
import { UniqueMovie, UniqueMovieResponse } from './movies.unique.interface';

@Injectable()
export class MoviesService {
  private baseURL = `https://www.omdbapi.com/?&apikey=${process.env.omdbApiKey}`;

  constructor(private readonly httpService: HttpService) {}
  async findAllByName({ name, page }: SearchMovieDto): Promise<MoviesSearchResponse> {
    const movieName = new FormatString(name, ' ', '+').format();
    const url = `${this.baseURL}&s=${movieName}&page=${page}`;
    const {
      data: { Search, totalResults, Response },
    } = await firstValueFrom(
      this.httpService.get<MoviesSearchData>(url).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    if (Response === 'False') {
      throw new Error('Movie not founded');
    }
    const totalResult = Number(totalResults);
    const pages = Math.floor(totalResult / 10) + (totalResult % 10 !== 0 ? 1 : 0);
    return { Search, totalResult, pages };
  }

  async findById({ imdbId }: MovieIdDto): Promise<UniqueMovieResponse> {
    const url = `${this.baseURL}&i=${imdbId}`;
    const {
      data: { Title, Year, Runtime, Genre, Plot, Poster, imdbID, imdbRating, imdbVotes, Type, Response },
    } = await firstValueFrom(
      this.httpService.get<UniqueMovie>(url).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
    if (Response === 'False') {
      throw new Error('Movie not founded');
    }
    return { Title, Year, Runtime, Genre, Plot, Poster, imdbID, imdbRating, imdbVotes, Type };
  }
}
