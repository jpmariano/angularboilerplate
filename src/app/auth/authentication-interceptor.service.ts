import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public authService: AuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let currentUser = this.authService.user;
    if (currentUser && this.authService.getToken() != null) {
      console.log('Test interceptor');
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`,
          'Content-Type': 'application/json',
        },
      });
    }
    return next.handle(req);
  }
}
