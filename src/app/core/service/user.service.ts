import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';

import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl:string = 'http://localhost:8080/v1';

  constructor(private http:HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`, {
      params: new HttpParams().set('pageNo','0').set('pageSize','20')
    });
  }

}
