import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class LoggedInAuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    let isAuth: boolean;
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        isAuth = !user ? false : true;
        if (isAuth) {
          this.router.navigate(['/admin/dashboard']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
