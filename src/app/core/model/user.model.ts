export class User {
  public uid: number;
  public name: string;
  public username: string;
  public status: number;
  public verrified: number;
  public vkey: string;
  public created: number;
  public changed: number;
  public access: number;
  public login: number;
  public mid: string[];
  public manageUsers: string[];
  public users_roles: UserRoles[];
  public user_meta: string[];

  constructor(
    uid: number,
    name: string,
    username: string,
    status: number,
    verrified: number,
    vkey: string,
    created: number,
    changed: number,
    access: number,
    login: number,
    mid: string[],
    manageUsers: string[],
    users_roles: UserRoles[],
    user_meta: string[]
  ) {
    this.uid = uid;
    this.name = name;
    this.username = username;
    this.status = status;
    this.verrified = verrified;
    this.vkey = vkey;
    this.created = created;
    this.changed = changed;
    this.access = access;
    this.login = login;
    this.mid = mid;
    this.manageUsers = manageUsers;
    this.users_roles = users_roles;
    this.user_meta = user_meta;
  }
}

export class UserRoles {
  public uid: number;
  public rid: number;
}
