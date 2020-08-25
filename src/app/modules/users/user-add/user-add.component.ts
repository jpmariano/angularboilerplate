import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/auth/authentication.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
})
export class UserAddComponent implements OnInit {
  userAddForm: FormGroup;

  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.userAddForm = new FormGroup({
      userData: new FormGroup({
        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        username: new FormControl(null, [
          Validators.email,
          Validators.required,
        ]),
        password: new FormControl(null, [Validators.required]),
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
    console.log(this.userAddForm);
    // let name: string =
    //   this.userAddForm.value['userData'].firstName +
    //   ' ' +
    //   this.userAddForm.value['userData'].lastName;
    // this.authService.signUp(
    //   name,
    //   this.userAddForm.value['userData'].username,
    //   this.userAddForm.value['userData'].password
    // ).subscribe(
    //   (resData) => {
    //     console.log(resData['body']);
    //     this.authService.userVerify(resData['body'].user['0'].vkey, resData['body'].key['0']);
    //   },
    //   (errorMessage) => {
    //     console.log(errorMessage);
    //   }
    // );
  }
}
