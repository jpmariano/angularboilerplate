import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';

import { Permission } from "../model/permission.model";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private baseUrl:string = 'http://localhost:8080/v1';

  constructor(private http:HttpClient) { }

  getAllPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.baseUrl}/admin/permissions/`);
  }

  getPermission() {

  }

}
