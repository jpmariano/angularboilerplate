import { RolePermission } from './role-permission.model';

export class Permission {
  pid: number;
  name: string;
  role_permissions: RolePermission[];
}

