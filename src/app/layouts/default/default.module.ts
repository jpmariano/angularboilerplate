import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { UsersComponent, RemoveUnderscorePipe } from '../../modules/users/users.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailsComponent } from 'src/app/modules/users/user-details/user-details.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    UsersComponent,
    UserDetailsComponent,
    RemoveUnderscorePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    NgbAlertModule
  ]
})
export class DefaultModule { }
