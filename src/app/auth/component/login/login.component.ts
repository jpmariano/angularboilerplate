import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  auth = false;
  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup(
      {
        'loginData': new FormGroup(
          {
            'username' : new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', [Validators.required])
          }
        )
      }
    )
  }

  ngOnInit(): void {

  }

  onSubmit(){
    this.auth = true;
    console.log(this.loginForm);
  }

}
