import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepo } from './repos/users.repo';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(
    private usersRepo: UsersRepo,
    private jwtService: JwtService,
  ) {}

  getUsers() {
    return this.usersRepo.getUsers();
  }

  async getMe(request: Request) {
    const token = request.headers.authorization.replace('Bearer ', '');
    const decodedUser = await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    return this.usersRepo.getMe(decodedUser);
  }

  async getUserByToken(token: string) {
    const decodedUser = await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    return this.usersRepo.getMe(decodedUser)
  }

  async addMovieToFavourites(movieId: number, request: Request) {
    const user = await this.getMe(request);
    const userId = user.id;
    return this.usersRepo.addMovieToFavourites(movieId, userId);
  }

  async removeMovieFromFavourites(movieId: number, request: Request) {
    const user = await this.getMe(request);
    const userId = user.id;
    return this.usersRepo.removeMovieFromFavourites(movieId, userId);
  }

  async getFavourites(request: Request) {
    const user = await this.getMe(request);
    const { id } = user;
    return this.usersRepo.getFavourites(id);
  }

}
