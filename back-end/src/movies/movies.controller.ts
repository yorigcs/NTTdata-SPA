import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SearchMovieDto } from './dto/search-movies-by-name.dto';
import { MovieIdDto } from './dto/search-movie-by-id.dto copy';

@Controller('api')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('movies')
  async findAllByName(@Body() searchMovieDto: SearchMovieDto) {
    try {
      return await this.moviesService.findAllByName(searchMovieDto);
    } catch (error) {
      throw new NotFoundException({ error: error.message });
    }
  }

  @Get('movie/:imdbId')
  async findById(@Param() movieIdDto: MovieIdDto) {
    try {
      return await this.moviesService.findById(movieIdDto);
    } catch (error) {
      throw new NotFoundException({ error: error.message });
    }
  }
}
