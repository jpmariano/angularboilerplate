"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RoleDeleteComponent = void 0;
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var RoleDeleteComponent = /** @class */ (function () {
    function RoleDeleteComponent(modalService, roleService) {
        this.modalService = modalService;
        this.roleService = roleService;
        this.closeResult = '';
    }
    RoleDeleteComponent.prototype.ngOnInit = function () { };
    RoleDeleteComponent.prototype.open = function (content) {
        var _this = this;
        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-title' })
            .result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    RoleDeleteComponent.prototype.getDismissReason = function (reason) {
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
    RoleDeleteComponent.prototype.deleteRole = function () {
        this.roleService.deleteRole(this.id, this.role.rid);
    };
    __decorate([
        core_1.Input()
    ], RoleDeleteComponent.prototype, "role");
    __decorate([
        core_1.Input('i')
    ], RoleDeleteComponent.prototype, "id");
    RoleDeleteComponent = __decorate([
        core_1.Component({
            selector: 'app-role-delete',
            templateUrl: './role-delete.component.html',
            styleUrls: ['./role-delete.component.css']
        })
    ], RoleDeleteComponent);
    return RoleDeleteComponent;
}());
exports.RoleDeleteComponent = RoleDeleteComponent;
