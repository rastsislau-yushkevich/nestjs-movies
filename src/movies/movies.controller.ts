import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MoviesRepo } from './repos/movies.repo';
import { CreateMovieForm } from './domain/create-movie.form';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

  constructor(
    private moviesService: MoviesService,
    private moviesRepo: MoviesRepo
    ) {}

  //page, perPage
  @Get()
  getMovies(@Query('page') page: string, @Query('perPage') perPage: string) {
    return this.moviesService.getMovies(Number(page), Number(perPage))
  }

  @Post('create')
  createMovie(@Body() createMovieForm: CreateMovieForm) {
    return this.moviesRepo.createMovie(createMovieForm)
  }

  @Get(':id')
  getMovieById(@Param('id') id: string) {
    return this.moviesRepo.getMovieById(Number(id))
  }

}
