"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RemoveUnderscorePipe = exports.UsersComponent = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var core_2 = require("@angular/core");
// interface Userz {
//   name: string;
//   email: string;
// 	status: string;
// }
var UsersComponent = /** @class */ (function () {
    function UsersComponent(userService, permissionService, roleService) {
        this.userService = userService;
        this.permissionService = permissionService;
        this.roleService = roleService;
        this.title = 'Users';
        this.titles = ['Users', 'Permissions', 'Roles'];
    }
    UsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getAllUsers();
        this.usersSubs = this.userService.usersChanged.subscribe(function (users) {
            return _this.users = users;
        });
        this.users = this.userService.getUsers();
        this.permissionService.getAllPermissions()
            .pipe(operators_1.first())
            .subscribe(function (permissions) {
            _this.permissions = permissions;
            console.log(permissions);
        });
        this.roleService.getAllRoles()
            .pipe(operators_1.first())
            .subscribe(function (roles) {
            _this.roles = roles;
            console.log(roles);
        });
    };
    UsersComponent.prototype.ngOnDestroy = function () {
        this.usersSubs.unsubscribe();
    };
    UsersComponent.prototype.onName = function (id) {
        return this.title = this.titles[id];
    };
    UsersComponent = __decorate([
        core_1.Component({
            selector: 'app-users',
            templateUrl: './users.component.html',
            styleUrls: ['./users.component.css']
        })
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
var RemoveUnderscorePipe = /** @class */ (function () {
    function RemoveUnderscorePipe() {
    }
    RemoveUnderscorePipe.prototype.transform = function (value, args) {
        return value.replace(/_/g, " ");
    };
    RemoveUnderscorePipe = __decorate([
        core_2.Pipe({ name: 'removeUnderscore' })
    ], RemoveUnderscorePipe);
    return RemoveUnderscorePipe;
}());
exports.RemoveUnderscorePipe = RemoveUnderscorePipe;
