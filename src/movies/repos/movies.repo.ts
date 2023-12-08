import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMovieForm } from "../domain/create-movie.form";

@Injectable()
export class MoviesRepo {

  constructor(private prisma: PrismaService) {}

  async getMovies(skip: number, take: number) {
    console.log(skip, take)
    return await this.prisma.movie.findMany({
      skip,
      take,
    })
  }

  async getMovieById(id: number) {
    return await this.prisma.movie.findUnique({
      where: {
        id
      }
    })
  }

  async getMoviesByTitle(title: string) {
    return await this.prisma.movie.findMany({
      where: {
        title
      }
    })
  }

  async createMovie(createMovieForm: CreateMovieForm) {
    const { title, description, rating, releaseDate, director, cover } = createMovieForm;
    return await this.prisma.movie.create({
      data: {
        title,
        description,
        rating: Number(rating),
        releaseDate,
        director,
        cover 
      }
    })
  }

}