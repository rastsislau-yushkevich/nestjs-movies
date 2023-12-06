import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { MoviesRepo } from 'src/movies/repos/movies.repo';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersRepo {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  getUsers() {
    return this.prisma.user.findMany({
      include: {
        movies: true,
      }
    });
  }

  async getMe(decodedUser) {
    return await this.prisma.user.findUnique({
      where: {
        id: decodedUser.sub,
      },
      include: {
        movies: true
      }
    });
  }

  async addMovieToFavourites(movieId: number, userId: number) {
    return await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        movies: {
          connect: [{id: movieId}]
        }
      },
      include: {
        movies: true
      }
    });
  }

  async removeMovieFromFavourites(movieId: number, userId: number) {
    return await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        movies: {
          disconnect: {id: movieId}
        }
      },
      include: {
        movies: true
      }
    });
  }

  async getFavourites(userId: number) {
    return this.prisma.movie.findMany({
      where: {
        users: {
          some: {
            id: userId
          }
        }
      }
    })
  }
}
