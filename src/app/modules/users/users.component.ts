import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../core/model/user.model';
import { Permission } from '../../core/model/permission.model';
import { UserService } from '../../core/service/user.service';
import { PermissionService } from '../../core/service/permission.service';
import { RoleService } from '../../core/service/role.service';
import { Role } from 'src/app/core/model/role.model';

// interface Userz {
//   name: string;
//   email: string;
// 	status: string;
// }

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  currentUser: User;
  users: User[];
  permissions: Permission[];
  roles: Role[];

  // USER_DATA: Userz[]= [
  //   {name: "John Paul Mariano", email: "jmariano@webupps.com", status: "Active" },
  //   {name: "Jeff Zeejay Belamide", email: "zeejaybelamide@gmail.com", status: "Active" },
  //   {name: "Juan dela Cruz", email: "juandela@cruz.com", status: "Active" },
  // ]

  constructor(private userService: UserService,
              private permissionService: PermissionService,
              private roleService: RoleService) { }

  ngOnInit(){
    this.userService.getAllUsers()
            .pipe(first())
            .subscribe(users => {
              this.users = users;
              console.log(users);
            });

    this.permissionService.getAllPermissions()
            .pipe(first())
            .subscribe(permissions => {
              this.permissions = permissions;
              console.log(permissions);
            });

    this.roleService.getAllRoles()
            .pipe(first())
            .subscribe(roles => {
              this.roles = roles;
              console.log(roles);
            })
  }

}
