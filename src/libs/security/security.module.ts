import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SecurityService } from "./security.service";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '10h'
    }
  })],
  providers: [SecurityService, JwtStrategy],
  exports: [SecurityService, JwtModule]
})
export class SecurityModule {}