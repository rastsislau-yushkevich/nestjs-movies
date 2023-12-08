import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SecurityService } from "src/libs/security/security.service";
import { SecurityModule } from "src/libs/security/security.module";
import { UsersRepo } from "src/users/repos/users.repo";
import { UsersService } from "src/users/users.service";

@Module({
  imports: [SecurityModule],
  controllers: [AuthController],
  providers: [AuthService, UsersRepo, UsersService]
})
export class AuthModule {

}