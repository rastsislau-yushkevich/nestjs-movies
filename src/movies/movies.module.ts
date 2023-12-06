import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MoviesRepo } from './repos/movies.repo';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepo]
})
export class MoviesModule {}
