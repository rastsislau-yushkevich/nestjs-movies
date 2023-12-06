import { Injectable, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepo } from './repos/users.repo';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [JwtModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepo]
})
export class UsersModule {}
