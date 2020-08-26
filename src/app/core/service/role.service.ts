import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';

import { Role } from '../model/role.model';

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
        console.log(this.roles);
        this.rolesChanged.next(this.roles.slice());
      });
  }

  getRoles() {
    return this.roles.slice();
  }

  addRole(name: string, weight: number) {
    return this.http.post(`${this.baseUrl}/role`, {
      name: name,
      weigth: weight,
    });
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
    return this.http.delete(`${this.baseUrl}/role/${rid}`, {
      responseType: 'text',
    }).subscribe((response)=> {
      console.log(response);
    });
  }
}
