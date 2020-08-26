import { RolePermission } from './role-permission.model';

export class Role {
  rid: number;
  name: string;
  weight: number;
  user_roles: UserRoles[];
  role_permissions: RolePermission[];
}


export class UserRoles {
  uid: number;
  rid: number;
}
