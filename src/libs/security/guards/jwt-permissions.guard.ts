import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { RoleTypes, UserPermissions } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { PERMISSION_KEY } from "../decorators/user-permissions.decorator";

@Injectable()
export class JwtGuard implements CanActivate {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private reflector: Reflector
    ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const requiredPermissions = this.reflector.getAllAndOverride<UserPermissions[]>(
      PERMISSION_KEY,
      [
        context.getHandler(), //возвращает хэндлер метода (например, getUsers). Из него и получается метадата в виде пермишшенов
        context.getClass() // возвращает весь класс (контроллер)
      ]
    ) //вся метадата попадает сюда из декоратора user-permissions.decorator.ts
    const req = context.switchToHttp().getRequest();
    const bearer = req.headers.authorization?.split(' ')[0]
    const token = req.headers.authorization?.split(' ')[1]

    if(bearer != 'Bearer' || !token) {
      throw new UnauthorizedException()
    }

    const decodedUser = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });

    const user = await this.prisma.user.findUnique({
      where: {
        id: decodedUser.sub
      }
    })

    const role = await this.prisma.role.findUnique({
      where: {
        id: user.roleId
      }
    })

    if(role.type === RoleTypes.SuperAdmin) {
      return true
    }

    return requiredPermissions.some((permission) => role.permissions.includes(permission))
  }
}