import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from '../../core/model/user.model';
import { Permission } from '../../core/model/permission.model';
import { UserService } from '../../core/service/user.service';
import { PermissionService } from '../../core/service/permission.service';
import { RoleService } from '../../core/service/role.service';
import { Role } from 'src/app/core/model/role.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  currentUser: User;
  users: User[];
  permissions: Permission[];
  roles: Role[];

  titles = ['Users', 'Permissions', 'Roles'];
  title = this.titles[0];

  usersSubs: Subscription;
  rolesSubs: Subscription;
  permissionsSubs: Subscription;

  constructor(
    private userService: UserService,
    private permissionService: PermissionService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.userService.getAllUsers();
    this.usersSubs = this.userService.usersChanged.subscribe(
      (users: User[]) => (this.users = users)
    );
    this.users = this.userService.getUsers();

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

  ngOnDestroy() {
    this.usersSubs.unsubscribe();
  }

  onName(id: number) {
    return (this.title = this.titles[id]);
  }
}

