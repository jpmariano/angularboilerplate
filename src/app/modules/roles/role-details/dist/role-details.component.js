"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RoleDetailsComponent = void 0;
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var RoleDetailsComponent = /** @class */ (function () {
    function RoleDetailsComponent(modalService, roleService, permissionService) {
        this.modalService = modalService;
        this.roleService = roleService;
        this.permissionService = permissionService;
        this.closeResult = '';
    }
    RoleDetailsComponent.prototype.ngOnInit = function () {
        this.rolePermissions = this.roleService.getPermissions(this.role);
    };
    RoleDetailsComponent.prototype.open = function (content) {
        var _this = this;
        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-title' })
            .result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    RoleDetailsComponent.prototype.getDismissReason = function (reason) {
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
    RoleDetailsComponent.prototype.getPermissionName = function (pid) {
        return this.permissionService.getPermissionName(pid);
    };
    __decorate([
        core_1.Input()
    ], RoleDetailsComponent.prototype, "role");
    __decorate([
        core_1.Input('i')
    ], RoleDetailsComponent.prototype, "id");
    RoleDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-role-details',
            templateUrl: './role-details.component.html',
            styleUrls: ['./role-details.component.css']
        })
    ], RoleDetailsComponent);
    return RoleDetailsComponent;
}());
exports.RoleDetailsComponent = RoleDetailsComponent;
