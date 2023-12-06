import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInForm } from "./domain/sign-in.form";
import { SignUpForm } from "./domain/sign-up.form";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Post('sign-in')
  signIn(@Body() signInForm: SignInForm) {
    return this.authService.signIn(signInForm);
  }

  @Post('sign-up')
  signUp(@Body() signUpForm: SignUpForm) {
    return this.authService.signUp(signUpForm);
  }
}