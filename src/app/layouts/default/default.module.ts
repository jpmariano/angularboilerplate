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
import { UsersListComponent } from 'src/app/modules/users/users-list/users-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { PermissionDeleteComponent } from 'src/app/modules/permissions/permission-delete/permission-delete.component';

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
    RolesComponent,
    RoleAddComponent,
    RoleDetailsComponent,
    RoleEditComponent,
    RoleDeleteComponent,
    PermissionsComponent,
    PermissionAddComponent,
    PermissionDeleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    DragDropModule
  ],
})
export class DefaultModule {}
