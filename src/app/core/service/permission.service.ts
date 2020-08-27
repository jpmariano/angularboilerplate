import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Permission } from '../model/permission.model';
import { first } from 'rxjs/operators';

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
        console.log(permissions);
        this.permissionsChanged.next(this.permissions.slice());
      });
  }

  getPermissions() {
    return this.permissions.slice();
  }

  getPermissionName(pid: number) {
    return this.search(pid, this.permissions);
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
