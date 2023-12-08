import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

type JwtPayload = {
  sub: number;
  email: string;
}

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    })
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email }
  }
}