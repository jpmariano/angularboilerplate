import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';

import { User } from '../../core/model/user.model';
import { Permission } from '../../core/model/permission.model';
import { UserService } from '../../core/service/user.service';
import { PermissionService } from '../../core/service/permission.service';
import { RoleService } from '../../core/service/role.service';
import { Role } from 'src/app/core/model/role.model';
import { Subscription } from 'rxjs';

// interface Userz {
//   name: string;
//   email: string;
// 	status: string;
// }

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
  title = 'Users';
  titles = ['Users', 'Permissions', 'Roles'];

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
        // console.log(this.roles);
        // console.log(this.roles['0'].role_permissions);
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

@Pipe({ name: 'removeUnderscore' })
export class RemoveUnderscorePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value.replace(/_/g, ' ');
  }
}
