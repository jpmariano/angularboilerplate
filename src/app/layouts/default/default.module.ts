import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import {
  UsersComponent,
  RemoveUnderscorePipe,
} from '../../modules/users/users.component';
import { UserDetailsComponent } from 'src/app/modules/users/user-details/user-details.component';
import { UserEditComponent } from 'src/app/modules/users/user-edit/user-edit.component';
import { UserDeleteComponent } from 'src/app/modules/users/user-delete/user-delete.component';
import { UserAddComponent } from 'src/app/modules/users/user-add/user-add.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    UsersComponent,
    UserDetailsComponent,
    UserAddComponent,
    UserEditComponent,
    UserDeleteComponent,
    RemoveUnderscorePipe
  ],
  imports: [CommonModule, RouterModule, SharedModule, NgbAlertModule, FormsModule, ReactiveFormsModule],
})
export class DefaultModule {}
