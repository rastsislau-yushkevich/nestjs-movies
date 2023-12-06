import { Injectable } from '@nestjs/common';
import { SignInForm } from './domain/sign-in.form';
import { SignUpForm } from './domain/sign-up.form';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { SecurityService } from 'src/libs/security/security.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private securityService: SecurityService) {}

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

    delete user.hashedPassword;

    return this.securityService.generateToken(user.id, user.email);
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

    return this.securityService.generateToken(createdUser.id, createdUser.email);
  }
}