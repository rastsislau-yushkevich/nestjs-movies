import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [UsersModule, AuthModule, PrismaModule, MoviesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
