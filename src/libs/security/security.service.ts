import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignInForm } from "src/auth/domain/sign-in.form";
import { UsersRepo } from "src/users/repos/users.repo";

@Injectable()
export class SecurityService {
  constructor(private jwtService: JwtService, private usersRepo: UsersRepo){}

  async generateToken(userId: number, email: string) {
    const payload = { sub: userId, email }
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      })
    ])
    return {
      access_token,
      refresh_token
    }
  }
}