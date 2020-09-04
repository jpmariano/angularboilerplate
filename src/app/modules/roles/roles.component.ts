import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { Subscription } from 'rxjs';

import { RoleService } from 'src/app/core/service/role.service';
import { Role } from 'src/app/core/model/role.model';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit, OnDestroy {
  roles: Role[];
  rolesSubs: Subscription;

  constructor(private roleService: RoleService) {
    // console.log(this.roles);
  }

  ngOnInit(): void {
    this.roleService.getAllRoles();
    this.rolesSubs = this.roleService.rolesChanged.subscribe(
      (roles: Role[]) => (this.roles = roles)
    );
    this.roles = this.roleService.getRoles();
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.roles, event.previousIndex, event.currentIndex);
    this.roles.forEach((role, idx) => {
      console.log(role + ' : ' + idx);
      this.roleService.updateWeight(role, idx + 1);
    });
  }
  ngOnDestroy() {
    this.rolesSubs.unsubscribe();
  }
}
