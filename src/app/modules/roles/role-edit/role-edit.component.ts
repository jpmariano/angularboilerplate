import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

import { RoleService } from 'src/app/core/service/role.service';
import { Role } from 'src/app/core/model/role.model';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css'],
})
export class RoleEditComponent implements OnInit {
  @ViewChild('f') editForm: NgForm;

  @Input() role: Role;
  @Input('i') id: number;

  closeResult = '';

  constructor(private modalService: NgbModal, private roleService: RoleService) {}

  ngOnInit(): void {
    console.log(this.roleService.getPermissions(this.role));
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm){
    this.role.name = f.value.name;
    this.role.weight = f.value.weight;
    this.roleService.updateRole(this.role, this.role.rid);
  }
}
