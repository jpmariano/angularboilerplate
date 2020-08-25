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
  rolesSubs: Subscription;

  constructor(
    private permissionService: PermissionService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.permissionService
      .getAllPermissions()
      .pipe(first())
      .subscribe((permissions) => {
        this.permissions = permissions;
        console.log(permissions);
      });

    this.roleService.getAllRoles();
    this.rolesSubs = this.roleService.rolesChanged.subscribe(
      (roles: Role[]) => (this.roles = roles)
    );
    this.roles = this.roleService.getRoles();
  }

  ngOnDestroy(){
    this.rolesSubs.unsubscribe();
  }
}
