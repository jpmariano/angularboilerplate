import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { User, UserRoles } from '../model/user.model';
import { first, map, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    responseType: 'text',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'http://localhost:8080/v1';

  userSelected = new Subject<User>();
  usersChanged = new Subject<User[]>();

  private users: User[] = [];

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http
      .get<User[]>(`${this.baseUrl}/users`, {
        params: new HttpParams().set('pageNo', '0').set('pageSize', '1000'),
      })
      .pipe(first())
      .subscribe((users) => {
        this.users = users;
        // console.log(users);
        this.usersChanged.next(this.users.slice());
      });
  }

  getUsers() {
    return this.users.slice();
  }

  getUserParams(username: string, status: string, rid: number, pid: number) {
    if(username === null && status === null && rid === null && pid === null){
      return;
    }
    const params = new HttpParams()
      .set('pageNo', '0')
      .set('pageSize', '1000')
      .set('username', username === null ? '' : username)
      .set('status', status === null ? '' : status)
      .set('pid', pid === null ? '' : pid.toString())
      .set('rid', rid === null ? '' : rid.toString());
    return this.http
      .get<User[]>(`${this.baseUrl}/users`, {
        params: params,
      })
      .pipe(first())
      .subscribe((users) => {
        this.users = users;
        // console.log(users);
        this.usersChanged.next(this.users.slice());
      });
  }

  addUser(name: string, username: string, password: string) {
    return this.http.post(`${this.baseUrl}/users/`, {
      name: name,
      username: username,
      password: password,
    });
  }

  updateUser(user: User, uid: number) {
    return this.http
      .put(`${this.baseUrl}/users/${uid}`, user, { responseType: 'text' })
      .pipe(
        map(
          (response) => console.log(response),
          catchError((errorRes) => {
            return throwError(errorRes);
          })
        )
      )
      .subscribe();
  }

  deleteUser(id: number, uid: number) {
    this.users.splice(id, 1);
    this.usersChanged.next(this.users.slice());
    return this.http
      .delete(`${this.baseUrl}/users/${uid}`, { responseType: 'text' })
      .subscribe((response) => {
        console.log(response);
      });
  }

  deleteUserRole(uid: number, rid: number) {
    return this.http
      .put(
        `${this.baseUrl}/users/${uid}`,
        {
          users_roles: [
            {
              users_rolesid: {
                uid: uid,
                rid: rid,
              },
            },
          ],
        },
        {
          params: new HttpParams().set('userrole', 'remove'),
          responseType: 'text',
        }
      )
      .pipe(
        map(
          (response) => console.log(response),
          catchError((errorRes) => {
            return throwError(errorRes);
          })
        )
      )
      .subscribe();
  }

  addUserRole(uid: number, rid: number) {
    return this.http
      .put(
        `${this.baseUrl}/users/${uid}`,
        {
          users_roles: [
            {
              users_rolesid: {
                uid: uid,
                rid: rid,
              },
            },
          ],
        },
        {
          responseType: 'text',
        }
      )
      .pipe(
        map(
          (response) => console.log(response),
          catchError((errorRes) => {
            return throwError(errorRes);
          })
        )
      )
      .subscribe();
  }
}
