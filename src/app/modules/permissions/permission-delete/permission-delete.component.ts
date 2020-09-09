import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Permission } from 'src/app/core/model/permission.model';
import { PermissionService } from 'src/app/core/service/permission.service';

@Component({
  selector: 'app-permission-delete',
  templateUrl: './permission-delete.component.html',
  styleUrls: ['./permission-delete.component.css']
})
export class PermissionDeleteComponent implements OnInit {

  @Input() permission: Permission;
  @Input() id: number;

  closeResult = '';

  ngOnInit(){

  }
  constructor(private modalService: NgbModal, private permissionService: PermissionService) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  deletePermission(){
    this.permissionService.deletePermission(this.id, this.permission.pid);
  }
}
