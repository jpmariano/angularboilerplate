import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

import { Permission } from 'src/app/core/model/permission.model';
import { PermissionService } from 'src/app/core/service/permission.service';
import { RoleService } from 'src/app/core/service/role.service';
import { Role } from 'src/app/core/model/role.model';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
})
export class PermissionsComponent implements OnInit, OnDestroy {
  rolePermissionForm: FormGroup;

  permissions: Permission[];
  roles: Role[];

  permissionsSubs: Subscription;
  rolesSubs: Subscription;

  formArray = new FormArray([new FormControl('test')]);

  constructor(
    private permissionService: PermissionService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    // this.rolePermissionForm = new FormGroup({
    //   'rolePermissionArr': new FormArray([
    //     new FormControl('John')
    //   ]),
    // });

    this.permissionService.getAllPermissions();
    this.permissionsSubs = this.permissionService.permissionsChanged.subscribe(
      (permissions: Permission[]) => {
        this.permissions = permissions;
      }
    );
    this.permissions = this.permissionService.getPermissions();

    this.roleService.getAllRoles();
    this.rolesSubs = this.roleService.rolesChanged.subscribe(
      (roles: Role[]) => (this.roles = roles)
    );
    this.roles = this.roleService.getRoles();
  }

  hasPermission(permission: Permission, role: Role): boolean {
    // this.formArray.push(new FormControl(role.rid.toString()));
    console.log('test');
    return this.permissionService.hasPermission(permission, role);
  }

  ngOnDestroy() {
    this.permissionsSubs.unsubscribe();
    this.rolesSubs.unsubscribe();
  }

  onSubmit() {
    console.log(this.rolePermissionForm);
  }

  getControls() {
    console.log(this.formArray.controls);
  }
}
