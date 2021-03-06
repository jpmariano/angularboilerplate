import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

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

  constructor(
    private permissionService: PermissionService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
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
    return this.permissionService.hasPermission(permission, role);
  }

  onChange(event: any, index: number, permission: Permission, role: Role) {
    console.log(this.hasPermission(permission, role));
    if (this.hasPermission(permission, role)) {
      this.roleService.deleteRolePermission(role.rid, permission.pid);
    } else {
      this.roleService.addRolePermission(role.rid, permission.pid);
    }
  }

  ngOnDestroy() {
    this.permissionsSubs.unsubscribe();
    this.rolesSubs.unsubscribe();
  }

  onSubmit() {
    console.log(this.rolePermissionForm);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.permissions, event.previousIndex, event.currentIndex);
    this.permissions.forEach((permission, idx) => {
      this.permissionService.updateWeight(permission, idx + 1);
    });
  }
}
