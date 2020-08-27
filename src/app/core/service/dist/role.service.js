"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RoleService = void 0;
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var RoleService = /** @class */ (function () {
    function RoleService(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:8080/v1/admin';
        this.roleSelected = new rxjs_1.Subject();
        this.rolesChanged = new rxjs_1.Subject();
        this.roles = [];
    }
    RoleService.prototype.getAllRoles = function () {
        var _this = this;
        return this.http
            .get(this.baseUrl + "/role")
            .pipe(operators_1.first())
            .subscribe(function (roles) {
            _this.roles = roles;
            // console.log(this.roles);
            _this.rolesChanged.next(_this.roles.slice());
        });
    };
    RoleService.prototype.getRoles = function () {
        return this.roles.slice();
    };
    RoleService.prototype.getPermissions = function (role) {
        // console.log(role.role_permissions);
        return role.role_permissions;
    };
    RoleService.prototype.addRole = function (name, weight) {
        return this.http.post(this.baseUrl + "/role", {
            name: name,
            weigth: weight
        });
    };
    RoleService.prototype.updateRole = function (role, rid) {
        return this.http
            .put(this.baseUrl + "/role/" + rid, role, { responseType: 'text' })
            .pipe(operators_1.map(function (response) { return console.log(response); }))
            .subscribe();
    };
    RoleService.prototype.deleteRole = function (id, rid) {
        this.roles.splice(id, 1);
        this.rolesChanged.next(this.roles.slice());
        return this.http["delete"](this.baseUrl + "/role/" + rid, {
            responseType: 'text'
        }).subscribe(function (response) {
            console.log(response);
        });
    };
    RoleService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RoleService);
    return RoleService;
}());
exports.RoleService = RoleService;
