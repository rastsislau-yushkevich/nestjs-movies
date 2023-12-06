import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { MoviesRepo } from './repos/movies.repo';
import { CreateMovieForm } from './domain/create-movie.form';
import { Request } from 'express';

@Controller('movies')
export class MoviesController {

  constructor(private moviesRepo: MoviesRepo) {}

  @Get()
  getMovies() {
    return this.moviesRepo.getAllMovies()
  }

  @Post('create')
  createMovie(@Body() createMovieForm: CreateMovieForm) {
    return this.moviesRepo.createMovie(createMovieForm)
  }

  @Get(':id')
  getMovieById(@Req() request: Request) {
    return this.moviesRepo.getMovieById(Number(request.params.id))
  }

}
