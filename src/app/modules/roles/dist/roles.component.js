"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RolesComponent = void 0;
var core_1 = require("@angular/core");
var RolesComponent = /** @class */ (function () {
    function RolesComponent(roleService) {
        this.roleService = roleService;
        console.log(this.roles);
    }
    RolesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.roleService.getAllRoles();
        this.rolesSubs = this.roleService.rolesChanged.subscribe(function (roles) { return (_this.roles = roles); });
        this.roles = this.roleService.getRoles();
    };
    RolesComponent.prototype.ngOnDestroy = function () {
        this.rolesSubs.unsubscribe();
    };
    RolesComponent = __decorate([
        core_1.Component({
            selector: 'app-roles',
            templateUrl: './roles.component.html',
            styleUrls: ['./roles.component.css']
        })
    ], RolesComponent);
    return RolesComponent;
}());
exports.RolesComponent = RolesComponent;
