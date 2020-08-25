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
        this.baseUrl = 'http://localhost:8080/v1';
        this.roleSelected = new rxjs_1.Subject();
        this.rolesChanged = new rxjs_1.Subject();
        this.roles = [];
    }
    RoleService.prototype.getAllRoles = function () {
        var _this = this;
        return this.http
            .get(this.baseUrl + "/admin/role")
            .pipe(operators_1.first())
            .subscribe(function (roles) {
            _this.roles = roles;
            _this.rolesChanged.next(_this.roles.slice());
        });
    };
    RoleService.prototype.getRoles = function () {
        return this.roles.slice();
    };
    RoleService.prototype.addRole = function (name, weight) {
        return this.http
            .post(this.baseUrl + "/admin/role", {
            "name": name,
            "weigth": weight
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
