import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/model/user.model';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userData'));
  }
}
