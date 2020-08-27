import { Component, OnInit, OnDestroy } from '@angular/core';
import { Permission } from 'src/app/core/model/permission.model';
import { PermissionService } from 'src/app/core/service/permission.service';
import { first } from 'rxjs/operators';
import { RoleService } from 'src/app/core/service/role.service';
import { Role } from 'src/app/core/model/role.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
})
export class PermissionsComponent implements OnInit, OnDestroy {
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

  ngOnDestroy(){
    this.rolesSubs.unsubscribe();
  }
}
