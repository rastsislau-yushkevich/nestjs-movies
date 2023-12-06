import { IsEmail, IsNotEmpty } from "class-validator";

export class SignUpForm {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}
