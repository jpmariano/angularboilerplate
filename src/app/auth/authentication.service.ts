import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { first, catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { UserService } from '../core/service/user.service';
import { User } from '../core/model/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user = new BehaviorSubject<User>(null);
  auth: boolean;

  private baseUrl: string = 'http://localhost:8080/v1';

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  logIn(username: string, password: string) {
    return this.httpClient
      .post(`${this.baseUrl}/login`, {
        username: username,
        password: password,
      })
      .pipe(first(), catchError(this.handleError));
  }

  signUp(username: string, password: string){

  }

  private handleError(errorRes: HttpErrorResponse) {
    return throwError('An unknown error occurs');
  }

  handleAuth(username: string, password: string) {

  }
}
