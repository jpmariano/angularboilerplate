import { RolePermission } from './role-permission.model';

export class Permission {
  pid: number;
  name: string;
  weight: number;
  role_permissions: RolePermission[];
}

