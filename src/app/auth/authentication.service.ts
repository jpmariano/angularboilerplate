import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserService } from '../core/service/user.service';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  constructor(private httpClient: HttpClient, private userService: UserService) { }


}
