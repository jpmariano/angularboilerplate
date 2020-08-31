import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { UsersComponent } from '../../modules/users/users.component';
import { UserDetailsComponent } from 'src/app/modules/users/user-details/user-details.component';
import { UserEditComponent } from 'src/app/modules/users/user-edit/user-edit.component';
import { UserDeleteComponent } from 'src/app/modules/users/user-delete/user-delete.component';
import { UserAddComponent } from 'src/app/modules/users/user-add/user-add.component';
import { RolesComponent } from 'src/app/modules/roles/roles.component';
import { PermissionsComponent } from 'src/app/modules/permissions/permissions.component';
import { RoleAddComponent } from 'src/app/modules/roles/role-add/role-add.component';
import { PermissionAddComponent } from 'src/app/modules/permissions/permission-add/permission-add.component';
import { RoleDetailsComponent } from 'src/app/modules/roles/role-details/role-details.component';
import { RoleEditComponent } from 'src/app/modules/roles/role-edit/role-edit.component';
import { RoleDeleteComponent } from 'src/app/modules/roles/role-delete/role-delete.component';
import { RemoveUnderscorePipe } from '../../shared/remove-underscore.pipe';
import { UsersListComponent } from 'src/app/modules/users/users-list/users-list.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    UsersComponent,
    UserDetailsComponent,
    UserAddComponent,
    UserEditComponent,
    UserDeleteComponent,
    UsersListComponent,
    RemoveUnderscorePipe,
    RolesComponent,
    RoleAddComponent,
    RoleDetailsComponent,
    RoleEditComponent,
    RoleDeleteComponent,
    PermissionsComponent,
    PermissionAddComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DefaultModule {}
