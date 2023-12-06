import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SecurityService } from "src/libs/security/security.service";
import { SecurityModule } from "src/libs/security/security.module";

@Module({
  imports: [SecurityModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {

}