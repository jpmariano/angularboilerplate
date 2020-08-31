"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PermissionService = void 0;
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var PermissionService = /** @class */ (function () {
    function PermissionService(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:8080/v1/admin';
        this.permissionSelected = new rxjs_1.Subject();
        this.permissionsChanged = new rxjs_1.Subject();
        this.permissions = [];
    }
    PermissionService.prototype.getAllPermissions = function () {
        var _this = this;
        return this.http
            .get(this.baseUrl + "/permissions/")
            .pipe(operators_1.first())
            .subscribe(function (permissions) {
            _this.permissions = permissions;
            // console.log(permissions);
            _this.permissionsChanged.next(_this.permissions.slice());
        });
    };
    PermissionService.prototype.getPermissions = function () {
        return this.permissions.slice();
    };
    PermissionService.prototype.getRoles = function (permission) {
        return permission.role_permissions;
    };
    PermissionService.prototype.hasPermission = function (permission, role) {
        var bool = false;
        for (var _i = 0, _a = this.getRoles(permission); _i < _a.length; _i++) {
            var role_per = _a[_i];
            if (role_per['role_permissionsid'].rid == role.rid) {
                bool = true;
                break;
            }
        }
        return bool;
    };
    PermissionService.prototype.getPermissionName = function (pid) {
        return this.search(pid, this.permissions);
    };
    PermissionService.prototype.search = function (pid, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].pid == pid) {
                return array[i].name;
            }
        }
        return '';
    };
    PermissionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PermissionService);
    return PermissionService;
}());
exports.PermissionService = PermissionService;
