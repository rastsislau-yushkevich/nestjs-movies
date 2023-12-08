import { Injectable } from '@nestjs/common';
import { MoviesRepo } from './repos/movies.repo';

@Injectable()
export class MoviesService {
  constructor(private moviesRepo: MoviesRepo) {}

  async getMovies(page: number, perPage: number) {
    const skip = page ? (page - 1) * perPage : 0;
    return this.moviesRepo.getMovies(skip, perPage);
  }

}
