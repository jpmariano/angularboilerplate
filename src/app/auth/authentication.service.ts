import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';
import { first, catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';

import { UserService } from '../core/service/user.service';
import { User } from '../core/model/user.model';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    responseType: 'json',
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user = new BehaviorSubject<User>(null);
  auth: boolean;
  token: string;

  private baseUrl: string = 'http://localhost:8080/v1';

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  logIn(username: string, password: string) {
    return this.httpClient
      .post(`${this.baseUrl}/login`, {
        username: username,
        password: password,
      })
      .pipe(
        first(),
        tap((resData) => {
          console.log(resData);
          this.token = resData['body'].key['0'];
          this.handleAuth(resData['body'].user['0'], this.token);
        }),
        catchError(this.handleError)
      );
  }

  signUp(name: string, username: string, password: string) {
    return this.httpClient
      .post(
        `${this.baseUrl}/register`,
        {
          name: name,
          username: username,
          password: password,
        },
        {
          params: new HttpParams().set('register', '1'),
        }
      )
      .pipe(
        first(),
        tap((resData) => {
          this.token = resData['body'].key['0'];
          this.handleAuth(resData['body'].user['0'], this.token);
        }),
        catchError(this.handleError)
      );
  }

  userVerify(vkey: string, token: string) {
    return this.httpClient
      .get(`${this.baseUrl}/verify/vkey/${vkey}`, httpOptions)
      .subscribe((response) => {
        console.log(response);
      });
  }

  getToken() {
    return localStorage.getItem('token') != null
      ? localStorage.getItem('token')
      : '';
  }

  logOut() {
    this.auth = false;
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage: string;
    switch (errorRes.status) {
      case (404 || 500):
        errorMessage = 'Incorrect Username or Password.';
        break;
      case 401:
        errorMessage = 'You are unauthenticated to login.';
        break;
      case 403:
        errorMessage = 'You does not have access rights to the content.';
        break;
      default:
        errorMessage = 'An unknown error occurs.';
    }
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    return throwError(errorMessage);
  }


  autoLogin() {
    const userData: User = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.uid,
      userData.name,
      userData.username,
      userData.status,
      userData.verrified,
      userData.vkey,
      userData.created,
      userData.changed,
      userData.access,
      userData.login,
      userData.mid,
      userData.manageUsers,
      userData.users_roles,
      userData.user_meta
    );

    if (loadedUser) {
      this.user.next(loadedUser);
    }
  }

  handleAuth(userData: User, token: string) {
    const user = new User(
      userData.uid,
      userData.name,
      userData.username,
      userData.status,
      userData.verrified,
      userData.vkey,
      userData.created,
      userData.changed,
      userData.access,
      userData.login,
      userData.mid,
      userData.manageUsers,
      userData.users_roles,
      userData.user_meta
    );
    this.user.next(user);
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(user));
    console.log('Inside on Auth');
    console.log(userData);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/admin/login']);
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  }
}
