import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

import { User } from 'src/app/core/model/user.model';
import { UserService } from 'src/app/core/service/user.service';
import { RoleService } from 'src/app/core/service/role.service';
import { Role } from 'src/app/core/model/role.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') editForm: NgForm;

  @Input() user: User;
  @Input() id: number;

  roles: Role[];
  userRoles: number[];
  role = 2;

  closeResult = '';
  rolesSubs: Subscription;

  constructor(
    private modalService: NgbModal,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.roleService.getAllRoles();
    this.rolesSubs = this.roleService.rolesChanged.subscribe(
      (roles: Role[]) => {
        this.roles = roles;
      }
    );
    this.roles = this.roleService.getRoles();
    this.userRoles = this.roleService.getUserRoles(this.user.uid);
    console.log(this.userRoles);
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
  }

  toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
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

  hasRole(roles: number[], rid: number): boolean{
    roles.forEach( (value) => {
      if(+value === +rid) {
        return true;
      }
    })
    return false;
  }

  onSubmit(f: NgForm) {
    this.user.name = f.value['userData'].name;
    this.user.username = f.value['userData'].username;
    console.log(f);
    // this.userService.updateUser(this.user, this.user.uid);
  }

  ngOnDestroy(){
    this.rolesSubs.unsubscribe();
  }
}
