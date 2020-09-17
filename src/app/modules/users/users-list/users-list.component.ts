import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

import { User } from 'src/app/core/model/user.model';
import { Permission } from 'src/app/core/model/permission.model';
import { Role } from 'src/app/core/model/role.model';
import { UserService } from 'src/app/core/service/user.service';
import { PermissionService } from 'src/app/core/service/permission.service';
import { RoleService } from 'src/app/core/service/role.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;

  users: User[];
  permissions: Permission[];
  roles: Role[];

  totalUsers: number;
  page: number = 1;

  statuses: number[] = [1, 2, 3];

  usersSubs: Subscription;
  rolesSubs: Subscription;
  permissionsSubs: Subscription;

  constructor(
    private userService: UserService,
    private permissionService: PermissionService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      queryParams: new FormGroup({
        username: new FormControl(null),
        status: new FormControl(null),
        role: new FormControl(null),
        permission: new FormControl(null),
      }),
    });

    this.userService.getAllUsers();
    this.usersSubs = this.userService.usersChanged.subscribe(
      (users: User[]) => (this.users = users)
    );
    this.users = this.userService.getUsers();
    this.totalUsers = this.users.length;

    this.permissionService.getAllPermissions();
    this.permissionsSubs = this.permissionService.permissionsChanged.subscribe(
      (permissions: Permission[]) => {
        this.permissions = permissions;
      }
    );
    this.permissions = this.permissionService.getPermissions();

    this.roleService.getAllRoles();
    this.rolesSubs = this.roleService.rolesChanged.subscribe(
      (roles: Role[]) => {
        this.roles = roles;
      }
    );
    this.roles = this.roleService.getRoles();
  }

  onSubmit() {
    this.userService.getUserParams(
      this.searchForm.get('queryParams.username').value,
      this.searchForm.get('queryParams.status').value,
      this.searchForm.get('queryParams.role').value,
      this.searchForm.get('queryParams.permission').value
    );
  }

  onClear() {
    this.searchForm.reset();
    this.userService.getAllUsers();
  }

  ngOnDestroy() {
    this.permissionsSubs.unsubscribe();
    this.rolesSubs.unsubscribe();
    this.usersSubs.unsubscribe();
  }
}
