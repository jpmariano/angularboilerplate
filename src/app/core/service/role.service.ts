import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';

import { Role } from '../model/role.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private baseUrl: string = 'http://localhost:8080/v1/admin';

  roleSelected = new Subject<Role>();
  rolesChanged = new Subject<Role[]>();

  private roles: Array<Role> = [];

  constructor(private http: HttpClient) {}

  getAllRoles() {
    return this.http
      .get<Role[]>(`${this.baseUrl}/role`)
      .pipe(first())
      .subscribe((roles) => {
        this.roles = roles;
        this.roles.sort((a, b) => (a.weight > b.weight ? 1 : -1));
        this.rolesChanged.next(this.roles.slice());
      });
  }

  getUserRoles(uid: number) : Array<number> {
    let userRoles = [];
    for(let role of this.roles){
      for(let user_role of role.users_roles){
        if(+user_role.users_rolesid.uid === +uid){
          userRoles.push(user_role.users_rolesid.rid);
        }
      }
    }
    return userRoles;
  }

  getRoles() {
    return this.roles.slice();
  }

  // getUserRoles(role: Role) {
  //   let object = [];
  //   role.users_roles.forEach((users_roles) => {
  //     object.push(users_roles.users_rolesid.uid);
  //   });
  //   return object;
  // }

  getPermissions(role: Role) {
    return role.role_permissions;
  }

  addRole(name: string, weight: number) {
    return this.http.post(`${this.baseUrl}/role`, {
      name: name,
      weigth: weight,
    });
  }

  updateWeight(role: Role, weight: number) {
    return this.http
      .put(
        `${this.baseUrl}/role/${role.rid}`,
        { weight: weight },
        { responseType: 'text' }
      )
      .pipe(map((response) => console.log(response)))
      .subscribe();
  }

  updateRole(role: Role, rid: number) {
    return this.http
      .put(`${this.baseUrl}/role/${rid}`, role, { responseType: 'text' })
      .pipe(map((response) => console.log(response)))
      .subscribe();
  }

  deleteRole(id: number, rid: number) {
    this.roles.splice(id, 1);
    this.rolesChanged.next(this.roles.slice());
    return this.http
      .delete(`${this.baseUrl}/role/${rid}`, {
        responseType: 'text',
      })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
