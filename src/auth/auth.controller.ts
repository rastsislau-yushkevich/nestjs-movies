import { Body, Controller, Headers, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInForm } from "./domain/sign-in.form";
import { SignUpForm } from "./domain/sign-up.form";
import { Request } from "express";
import { JwtGuard } from "src/libs/security/guards/jwt-permissions.guard";
import { RequiredPermissions } from "src/libs/security/decorators/user-permissions.decorator";
import { UserPermissions } from "@prisma/client";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    ){}

  @Post('sign-in')
  signIn(@Body() signInForm: SignInForm) {
    return this.authService.signIn(signInForm);
  }

  @Post('sign-up')
  signUp(@Body() signUpForm: SignUpForm) {
    return this.authService.signUp(signUpForm);
  }

  @Post('logout')
  logout(@Headers('Authorization') bearerToken: string) {
    return this.authService.logout(bearerToken)
  }

  @UseGuards(JwtGuard)
  @RequiredPermissions(UserPermissions.GetMe)
  @Post('refresh')
  refresh(@Req() request: Request) {
    return this.authService.refresh(request);
  }
}