import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isToggled = false;
  auth = false;
  isAuthenticated = false;
  user: User;
  private userSub: Subscription;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(
      (user) => {
        this.isAuthenticated = !user ? false : true;
      }
    )
    this.user = JSON.parse(localStorage.getItem('userData'));
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  onToggled() {
    this.isToggled = !this.isToggled;
  }

  isAuth() {
    this.auth = this.authService.auth;
  }

  onLogout() {
    this.authService.logout();
  }
}
