"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PermissionsComponent = void 0;
var core_1 = require("@angular/core");
var PermissionsComponent = /** @class */ (function () {
    function PermissionsComponent(permissionService, roleService) {
        this.permissionService = permissionService;
        this.roleService = roleService;
    }
    PermissionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.permissionService.getAllPermissions();
        this.permissionsSubs = this.permissionService.permissionsChanged.subscribe(function (permissions) {
            _this.permissions = permissions;
        });
        this.permissions = this.permissionService.getPermissions();
        this.roleService.getAllRoles();
        this.rolesSubs = this.roleService.rolesChanged.subscribe(function (roles) { return (_this.roles = roles); });
        this.roles = this.roleService.getRoles();
    };
    PermissionsComponent.prototype.hasPermission = function (permission, role) {
        return this.permissionService.hasPermission(permission, role);
    };
    PermissionsComponent.prototype.ngOnDestroy = function () {
        this.rolesSubs.unsubscribe();
    };
    PermissionsComponent = __decorate([
        core_1.Component({
            selector: 'app-permissions',
            templateUrl: './permissions.component.html',
            styleUrls: ['./permissions.component.css']
        })
    ], PermissionsComponent);
    return PermissionsComponent;
}());
exports.PermissionsComponent = PermissionsComponent;
