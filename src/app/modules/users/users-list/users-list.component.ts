import { Component, OnInit, OnDestroy, PipeTransform } from '@angular/core';
import { User } from 'src/app/core/model/user.model';
import { Permission } from 'src/app/core/model/permission.model';
import { Role } from 'src/app/core/model/role.model';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/service/user.service';
import { PermissionService } from 'src/app/core/service/permission.service';
import { RoleService } from 'src/app/core/service/role.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[];
  permissions: Permission[];
  roles: Role[];

  userKeyword: string;

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
    this.permissionsSubs.unsubscribe();
    this.rolesSubs.unsubscribe();
    this.usersSubs.unsubscribe();
  }
}

