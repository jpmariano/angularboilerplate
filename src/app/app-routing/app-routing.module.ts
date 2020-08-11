import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from '../layouts/default/default.component';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { UsersComponent } from '../modules/users/users.component';
import { LoginComponent } from '../login/login/login.component';


const routes: Routes = [
  {
      path: '',
      component: DefaultComponent,
      children: [{
        path: '',
        component: DashboardComponent
      },
      {
        path: 'users',
        component: UsersComponent
      }
    ]
  }
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
