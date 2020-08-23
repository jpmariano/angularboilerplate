import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  submitted = false;
  returnUrl: string;
  error: string = null;
  auth = false;
  loginForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      loginData: new FormGroup({
        username: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
      }),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.isLoading = true;
    console.log(this.loginForm.value);
    this.authService
      .logIn(
        this.loginForm.get('loginData.username').value,
        this.loginForm.get('loginData.password').value
      )
      .subscribe(
        (resData) => {
          console.log(resData);
          // console.log(resData['body']);
          this.authService.user.next(resData['body'].user['0']);
          this.isLoading = false;
          this.router.navigate(['./dashboard']);
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.isLoading = false;
          this.error = errorMessage;
        }
      );
  }
}
