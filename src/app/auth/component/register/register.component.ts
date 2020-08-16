import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;

  constructor() {
    this.signupForm = new FormGroup({
      'signupData' : new FormGroup(
        {
          'firstName': new FormControl('',[Validators.required]),
          'lastName': new FormControl('',[Validators.required]),
          'username': new FormControl('',[Validators.required]),
          'password': new FormControl('',[Validators.required])
        }
      )
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){

  }
}
