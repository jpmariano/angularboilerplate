import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { first, catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';

import { UserService } from '../core/service/user.service';
import { User } from '../core/model/user.model';
import { Router } from '@angular/router';

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
          this.handleAuth(resData['body'].user['0']);
        }),
        catchError(this.handleError)
      );
  }

  signUp(username: string, password: string) {}

  logOut() {
    this.auth = false;
  }

  private handleError(errorRes: HttpErrorResponse) {
    return throwError('An unknown error occurs');
  }

  autoLogin(){
    const userData: User = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
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
      userData.user_roles,
      userData.user_meta
    );

    if(loadedUser){
      this.user.next(loadedUser);
    }
  }

  handleAuth(userData: User) {
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
      userData.user_roles,
      userData.user_meta
    );
    this.user.next(user);
    localStorage.setItem('userData',JSON.stringify(user));
    console.log('Inside on Auth');
    console.log(userData);
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/admin/login']);
    localStorage.removeItem('userData');
  }
}
