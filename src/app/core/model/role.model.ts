import { RolePermission } from './role-permission.model';

export class Role {
  public rid?: number;
  public name: string;
  public weight: number;
  public users_roles: UserRoles[];
  public role_permissions: RolePermission[];
}

export class UserRoles {
  users_rolesid: {
    uid: number;
    rid: number;
  };
}
