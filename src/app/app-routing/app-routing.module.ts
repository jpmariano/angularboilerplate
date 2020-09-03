import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from '../layouts/default/default.component';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { UsersComponent } from '../modules/users/users.component';
import { FullWidthComponent } from '../layouts/fullwidth/fullwidth.component';
import { LoginComponent } from '../auth/component/login/login.component';
import { RegisterComponent } from '../auth/component/register/register.component';

import { AuthGuard } from '../auth/authentication.guard';
import { LoggedInAuthGuard } from '../auth/loggedin-auth.guard';
import { ProfileComponent } from '../modules/profile/profile.component';

const routes: Routes = [
  {
      path: 'admin',
      component: DefaultComponent,
      canActivate: [AuthGuard],
      children: [{
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },{
        path: 'profile',
        component: ProfileComponent
      }
    ]
  },
  {
    path: 'admin',
    component: FullWidthComponent,
    canActivate: [LoggedInAuthGuard],
    children: [{
      path: 'login',
      component: LoginComponent
    }, {
      path: 'register',
      component: RegisterComponent
    }]
  },
  { path: 'admin', redirectTo: '/admin/dashboard'},
  { path: '**', redirectTo: '/admin/dashboard' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
