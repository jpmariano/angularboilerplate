"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var http_2 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var httpOptions = {
    headers: new http_2.HttpHeaders({
        responseType: 'text'
    })
};
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:8080/v1';
        this.userSelected = new rxjs_1.Subject();
        this.usersChanged = new rxjs_1.Subject();
        this.users = [];
    }
    UserService.prototype.getAllUsers = function () {
        var _this = this;
        return this.http
            .get(this.baseUrl + "/users", {
            params: new http_1.HttpParams().set('pageNo', '0').set('pageSize', '20')
        })
            .pipe(operators_1.first())
            .subscribe(function (users) {
            _this.users = users;
            console.log(users);
            _this.usersChanged.next(_this.users.slice());
        });
    };
    UserService.prototype.getUsers = function () {
        return this.users.slice();
    };
    UserService.prototype.addUser = function (name, username, password) {
        return this.http.post(this.baseUrl + "/users/", {
            "name": name,
            "username": username,
            "password": password
        });
    };
    UserService.prototype.updateUser = function (user, uid) {
        return this.http
            .put(this.baseUrl + "/users/" + uid, user, { responseType: 'text' })
            .pipe(operators_1.map(function (response) { return console.log(response); }, operators_1.catchError(function (errorRes) {
            return rxjs_1.throwError(errorRes);
        })))
            .subscribe();
    };
    UserService.prototype.deleteUser = function (id, uid) {
        this.users.splice(id, 1);
        this.usersChanged.next(this.users.slice());
        return this.http["delete"](this.baseUrl + "/users/" + uid, { responseType: 'text' })
            .subscribe(function (response) {
            console.log(response);
        });
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
