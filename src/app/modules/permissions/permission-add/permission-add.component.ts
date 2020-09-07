import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PermissionService } from 'src/app/core/service/permission.service';

@Component({
  selector: 'app-permission-add',
  templateUrl: './permission-add.component.html',
  styleUrls: ['./permission-add.component.css'],
})
export class PermissionAddComponent implements OnInit {
  permissionAddForm: FormGroup;

  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.permissionAddForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
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

  onSubmit() {
    console.log(this.permissionAddForm);
    this.permissionService.addPermission(this.permissionAddForm.get('name').value);
  }
}
