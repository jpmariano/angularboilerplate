import { RolePermission } from './role-permission.model';

export class Role {
  public rid: number;
  public name: string;
  public weight: number;
  public user_roles: UserRoles[];
  public role_permissions: RolePermission[];
}

export class UserRoles {
  uid: number;
  rid: number;
}
