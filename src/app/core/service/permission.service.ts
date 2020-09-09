import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Permission } from '../model/permission.model';
import { first, map } from 'rxjs/operators';
import { Role } from '../model/role.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private baseUrl: string = 'http://localhost:8080/v1/admin';

  permissionSelected = new Subject<Permission>();
  permissionsChanged = new Subject<Permission[]>();

  private permissions: Permission[] = [];

  constructor(private http: HttpClient) {}

  getAllPermissions() {
    return this.http
      .get<Permission[]>(`${this.baseUrl}/permissions/`)
      .pipe(first())
      .subscribe((permissions) => {
        this.permissions = permissions;
        this.permissionsChanged.next(this.permissions.slice());
      });
  }

  getPermissions() {
    return this.permissions.slice();
  }

  getRoles(permission: Permission) {
    return permission.role_permissions;
  }

  addPermission(name: string){
    let weight = Math.max.apply(
      Math,
      this.permissions.map(function (o) {
        return o.weight;
      })
    ) + 1;
    return this.http
      .post<Permission>(`${this.baseUrl}/permissions`, {
        name: name,
        weight: weight
      }).subscribe((newPermission) => {
        this.permissions.push(newPermission);
        this.permissionsChanged.next(this.permissions.slice());
      })
  }

  hasPermission(permission: Permission, role: Role): boolean {
    let bool: boolean = false;
    for (let role_per of this.getRoles(permission)) {
      if (role_per['role_permissionsid'].rid == role.rid) {
        bool = true;
        break;
      }
    }
    return bool;
  }

  deletePermission(id: number, pid:number){
    this.permissions.splice(id, 1);
    this.permissionsChanged.next(this.permissions.slice());
    return this.http.delete(`${this.baseUrl}/permissions/${pid}`, {
      responseType: 'text',
    }).subscribe((response) => {
      console.log(response);
    });
  }

  getPermissionName(pid: number) {
    return this.search(pid, this.permissions);
  }

  updateWeight(permission: Permission, weight: number) {
    return this.http
      .put(
        `${this.baseUrl}/permissions/${permission.pid}`,
        {
          weight: weight,
        },
        {
          responseType: 'text',
        }
      )
      .pipe(map((response) => console.log(response)))
      .subscribe();
  }

  search(pid: number, array: Permission[]): string {
    for (let i = 0; i < array.length; i++) {
      if (array[i].pid == pid) {
        return array[i].name;
      }
    }
    return '';
  }
}
