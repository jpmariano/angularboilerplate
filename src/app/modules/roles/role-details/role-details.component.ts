import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Role } from 'src/app/core/model/role.model';
import { PermissionService } from 'src/app/core/service/permission.service';
import { RoleService } from 'src/app/core/service/role.service';
import { RolePermission } from 'src/app/core/model/role-permission.model';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css'],
})
export class RoleDetailsComponent implements OnInit {
  @Input() role: Role;
  @Input('i') id: number;

  rolePermissions: RolePermission[];

  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private roleService: RoleService,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    // this.rolePermissions = this.roleService.getPermissions(this.role);
    // this.roleService.getUserRoles(this.role);
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    this.rolePermissions = this.roleService.getPermissions(this.role);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getPermissionName(pid: number) {
    return this.permissionService.getPermissionName(pid);
  }
}
