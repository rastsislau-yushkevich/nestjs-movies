import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { SignInForm } from './domain/sign-in.form';
import { SignUpForm } from './domain/sign-up.form';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { SecurityService } from 'src/libs/security/security.service';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
import { User } from '@prisma/client';
import { UserAssignTokenDto } from './dtos/user-assign-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private securityService: SecurityService,
    private usersService: UsersService
    ) {}

  async signIn(signInForm: SignInForm) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: signInForm.email,
      },
    });

    if (!user) {
      return { err: 'There is no such user' };
    }

    const passwordMatch = argon2.verify(user.hashedPassword, signInForm.password);

    if(!passwordMatch) {
      return { err: 'Wrong password' }
    }

    return await this.assignTokens(user);
  }

  async signUp(signUpForm: SignUpForm) {
    const user = await this.prisma.user.findUnique({
      where: { email: signUpForm.email },
    });

    if (user) {
      return { err: 'This user already exists' };
    }

    if(signUpForm.password !== signUpForm.confirmPassword) {
      return { err: 'Passwords are not the same' }
    }

    const hashedPassword = await argon2.hash(signUpForm.password);

    const createdUser = await this.prisma.user.create({
      data: {
        email: signUpForm.email,
        hashedPassword,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return await this.assignTokens(createdUser)
  }

  async logout(bearerToken: string) {
    const token = bearerToken.replace('Bearer ', '');
    const user = await this.usersService.getUserByToken(token);

    return this.prisma.user.update({
      where: {
        id: user.id
      }, 
      data: {
        refreshToken: null
      }
    })
  }

  async refresh(request: Request) {
    const currentUser = await this.usersService.getMe(request);

    if(!currentUser) {
      throw new HttpException('Unauthorized' , HttpStatus.UNAUTHORIZED)
    }

    return await this.assignTokens(currentUser)
  }

  async assignTokens(user: UserAssignTokenDto) {
    const tokens = await this.securityService.generateToken(user.id, user.email);

    await this.prisma.user.update({
      data: {
        refreshToken: tokens.refresh_token,
      }, 
      where: {
        id: user.id
      }
    })

    return tokens;
  }

}