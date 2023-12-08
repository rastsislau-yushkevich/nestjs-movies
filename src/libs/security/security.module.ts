import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SecurityService } from "./security.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UsersRepo } from "src/users/repos/users.repo";

@Module({
  imports: [JwtModule.register({})],
  providers: [SecurityService, JwtStrategy, UsersRepo],
  exports: [SecurityService, JwtModule]
})
export class SecurityModule {}