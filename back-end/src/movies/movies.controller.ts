import { Body, Controller, Get, NotFoundException } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SearchMovieDto } from './dto/search-movies-by-name.dto';

@Controller('api')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('movies')
  async findOne(@Body() searchMovieDto: SearchMovieDto) {
    try {
      await this.moviesService.findAllByName(searchMovieDto);
    } catch (error) {
      throw new NotFoundException({ error: error.message });
    }
  }
}
