import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignInForm } from "src/auth/domain/sign-in.form";

@Injectable()
export class SecurityService {
  constructor(private jwtService: JwtService){}

  async generateToken(userId: number, email: string) {
    const payload = { sub: userId, email }
    
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}