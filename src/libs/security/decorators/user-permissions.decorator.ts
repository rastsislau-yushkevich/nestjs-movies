import { SetMetadata } from "@nestjs/common";
import { UserPermissions } from "@prisma/client";

export const PERMISSION_KEY = 'permissions';

export const RequiredPermissions = (...permissions: UserPermissions[]) => SetMetadata(PERMISSION_KEY, permissions)