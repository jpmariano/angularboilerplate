export class User {

  // password: string;
  constructor(public uid: number,
    public name: string,
    public username: string,
    public status: number,
    public verrified: number,
    public vkey: string,
    public created: number,
    public changed: number,
    public access: number,
    public login: number,
    public mid: string[],
    public manageUsers: string[],
    public user_roles: string[],
    public user_meta: string[]) {}
}
