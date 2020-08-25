"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserAddComponent = void 0;
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var UserAddComponent = /** @class */ (function () {
    function UserAddComponent(modalService, userService, authService) {
        this.modalService = modalService;
        this.userService = userService;
        this.authService = authService;
        this.closeResult = '';
    }
    UserAddComponent.prototype.ngOnInit = function () {
        this.userAddForm = new forms_1.FormGroup({
            userData: new forms_1.FormGroup({
                firstName: new forms_1.FormControl(null, [forms_1.Validators.required]),
                lastName: new forms_1.FormControl(null, [forms_1.Validators.required]),
                username: new forms_1.FormControl(null, [
                    forms_1.Validators.email,
                    forms_1.Validators.required,
                ]),
                password: new forms_1.FormControl(null, [forms_1.Validators.required])
            })
        });
    };
    UserAddComponent.prototype.open = function (content) {
        var _this = this;
        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-title' })
            .result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    UserAddComponent.prototype.getDismissReason = function (reason) {
        if (reason === ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    UserAddComponent.prototype.onSubmit = function () {
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
    };
    UserAddComponent = __decorate([
        core_1.Component({
            selector: 'app-user-add',
            templateUrl: './user-add.component.html',
            styleUrls: ['./user-add.component.css']
        })
    ], UserAddComponent);
    return UserAddComponent;
}());
exports.UserAddComponent = UserAddComponent;
