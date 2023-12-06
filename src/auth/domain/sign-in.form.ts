import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInForm {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}