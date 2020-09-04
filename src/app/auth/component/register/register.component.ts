import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.signupForm = new FormGroup({
      signupData: new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        confirm_password: new FormControl('', [Validators.required]),
      }),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.isLoading = true;
    let name: string;
    name =
      this.signupForm.value['signupData'].firstName +
      ' ' +
      this.signupForm.value['signupData'].lastName;
    console.log(this.signupForm.value);
    console.log(name);
    if (
      this.signupForm.value['signUpData'].password ===
      this.signupForm.value['signUpData'].confirm_password
    ) {
      this.authService
        .signUp(
          name,
          this.signupForm.get('signupData.username').value,
          this.signupForm.get('signupData.password').value
        )
        .subscribe(
          (resData) => {
            console.log(resData['body']);
            this.authService.user.next(resData['body'].user);
            this.isLoading = false;
            this.authService.userVerify(
              resData['body'].user['0'].vkey,
              resData['body'].key['0']
            );
            this.router.navigate(['./dashboard']);
          },
          (errorMessage) => {
            console.log(errorMessage);
            this.isLoading = false;
            this.error = errorMessage;
          }
        );
    } else {
      this.error = "Your Password and Confirmation Password doesn't not match";
    }
  }
}
