import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/libs/security/guards/jwt-permissions.guard';
import { JwtAuthGuard } from 'src/libs/security/guards/jwt-passport.guard';
import { RequiredPermissions } from 'src/libs/security/decorators/user-permissions.decorator';
import { UserPermissions } from '@prisma/client';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @UseGuards(JwtAuthGuard)
  // @RequiredPermissions(UserPermissions.GetUsers)
  // @UseGuards(JwtGuard)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
  
  // @UseGuards(JwtGuard)
  @UseGuards(JwtGuard)
  @RequiredPermissions(UserPermissions.GetMe)
  @Post('get-me')
  getMe(@Req() request: Request) {
    return this.usersService.getMe(request);
  }

  // @RequiredPermissions(UserPermissions.GetMe)
  @Post('add-to-favourites')
  addMovieToFavourites(@Body() body: any, @Req() request: Request) {
    const {movieId} = body;
    return this.usersService.addMovieToFavourites(Number(movieId), request)
  }

  // @RequiredPermissions(UserPermissions.GetMe)
  @Post('remove-from-favourites')
  removeMovieFromFavourites(@Body() body: any, @Req() request: Request) {
    const {movieId} = body;
    return this.usersService.removeMovieFromFavourites(Number(movieId), request)
  }

  @Get('favourites')
  getFavourites(@Req() request: Request) {
    return this.usersService.getFavourites(request)
  }

}
