import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMovieForm } from "../domain/create-movie.form";

@Injectable()
export class MoviesRepo {

  constructor(private prisma: PrismaService) {}

  getAllMovies() {
    return this.prisma.movie.findMany()
  }

  getMovieById(id: number) {
    return this.prisma.movie.findUnique({
      where: {
        id
      }
    })
  }

  getMoviesByTitle(title: string) {
    return this.prisma.movie.findMany({
      where: {
        title
      }
    })
  }

  createMovie(createMovieForm: CreateMovieForm) {
    const { title, description, rating, releaseDate, director, cover } = createMovieForm;
    return this.prisma.movie.create({
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