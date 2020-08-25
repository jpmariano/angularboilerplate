"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RoleAddComponent = void 0;
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var RoleAddComponent = /** @class */ (function () {
    function RoleAddComponent(modalService) {
        this.modalService = modalService;
        this.closeResult = '';
    }
    RoleAddComponent.prototype.ngOnInit = function () {
        this.roleAddForm = new forms_1.FormGroup({
            name: new forms_1.FormControl(null, [forms_1.Validators.required]),
            weight: new forms_1.FormControl(null, [forms_1.Validators.required])
        });
    };
    RoleAddComponent.prototype.open = function (content) {
        var _this = this;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    RoleAddComponent.prototype.getDismissReason = function (reason) {
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
    RoleAddComponent.prototype.onSubmit = function () { };
    RoleAddComponent = __decorate([
        core_1.Component({
            selector: 'app-role-add',
            templateUrl: './role-add.component.html',
            styleUrls: ['./role-add.component.css']
        })
    ], RoleAddComponent);
    return RoleAddComponent;
}());
exports.RoleAddComponent = RoleAddComponent;
