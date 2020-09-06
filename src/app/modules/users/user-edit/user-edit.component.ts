import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';

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
  @Input() user: User;
  @Input() id: number;

  editForm: FormGroup;

  roles: Role[];
  userRoles: number[];
  checks: boolean[] = [];
  roleLength: number;
  role = 2;

  closeResult = '';
  rolesSubs: Subscription;

  constructor(
    private modalService: NgbModal,
    private roleService: RoleService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.roleService.getAllRoles();
    this.rolesSubs = this.roleService.rolesChanged.subscribe(
      (roles: Role[]) => {
        this.roles = roles;
      }
    );
    this.roles = this.roleService.getRoles();
    this.editForm = new FormGroup({
      userData: new FormGroup({
        name: new FormControl(this.user.name, [Validators.required]),
        username: new FormControl(this.user.username, [
          Validators.required,
          Validators.email,
        ]),
      }),
    });
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
    this.roleLength = Object.keys(this.roles).length;
    this.userRoles = this.roleService.getUserRoles(this.user.uid);
    this.assignChecked(this.userRoles, this.roleLength);
  }

  onChange(event, index, rid) {
    this.checks[index] = !this.checks[index];
    if (this.checks[index]) {
      this.userService.addUserRole(this.user.uid, rid);
    } else {
      this.userService.deleteUserRole(this.user.uid, rid);
    }
  }

  assignChecked(userRoles: number[], roleLength: number) {
    if (userRoles === []) {
      this.checks = [];
    } else {
      for (let i = 0; i < roleLength; i++) {
        if (userRoles.includes(i + 1)) {
          this.checks.push(true);
        } else {
          this.checks.push(false);
        }
      }
    }
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

  hasRole(rid: number): boolean {
    this.userRoles.forEach((value) => {
      if (+value === +rid) {
        return true;
      }
    });
    return false;
  }

  onSubmit() {
    this.user.name = this.editForm.get('userData.name').value;
    this.user.username = this.editForm.get('userData.username').value;
    this.userService.updateUser(this.user, this.user.uid);
  }

  ngOnDestroy() {
    this.rolesSubs.unsubscribe();
  }
}
