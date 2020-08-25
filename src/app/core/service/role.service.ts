import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';

import { Role } from '../model/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private baseUrl: string = 'http://localhost:8080/v1';

  roleSelected = new Subject<Role>();
  rolesChanged = new Subject<Role[]>();

  private roles: Role[] = [];

  constructor(private http: HttpClient) {}

  getAllRoles() {
    return this.http
      .get<Role[]>(`${this.baseUrl}/admin/role`)
      .pipe(first())
      .subscribe((roles)=>{
        this.roles = roles;
        this.rolesChanged.next(this.roles.slice());
      });
  }

  getRoles(){
    return this.roles.slice();
  }

  addRole(name: string, weight: number){
    return this.http
    .post(`${this.baseUrl}/admin/role`, {
      "name": name,
      "weigth": weight
    });
  }
}
