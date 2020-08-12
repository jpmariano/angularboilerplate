import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from '../layouts/default/default.component';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { UsersComponent } from '../modules/users/users.component';
import { LoginComponent } from '../login/login/login.component';


const routes: Routes = [
  {
      path: 'admin',
      component: DefaultComponent,
      children: [{
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'users',
        component: UsersComponent
      }
    ]
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
