"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthenticationService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var user_model_1 = require("../core/model/user.model");
var httpOptions = {
    headers: new http_1.HttpHeaders({
        'Content-Type': 'application/json',
        responseType: 'json',
        'Access-Control-Allow-Origin': '*'
    })
};
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(httpClient, userService, router) {
        this.httpClient = httpClient;
        this.userService = userService;
        this.router = router;
        this.user = new rxjs_1.BehaviorSubject(null);
        this.baseUrl = 'http://localhost:8080/v1';
    }
    AuthenticationService.prototype.logIn = function (username, password) {
        var _this = this;
        return this.httpClient
            .post(this.baseUrl + "/login", {
            username: username,
            password: password
        })
            .pipe(operators_1.first(), operators_1.tap(function (resData) {
            console.log(resData);
            _this.token = resData['body'].key['0'];
            _this.handleAuth(resData['body'].user['0'], _this.token);
        }), operators_1.catchError(this.handleError));
    };
    AuthenticationService.prototype.signUp = function (name, username, password) {
        var _this = this;
        return this.httpClient
            .post(this.baseUrl + "/register", {
            name: name,
            username: username,
            password: password
        }, {
            params: new http_1.HttpParams().set('register', '1')
        })
            .pipe(operators_1.first(), operators_1.tap(function (resData) {
            _this.token = resData['body'].key['0'];
            _this.handleAuth(resData['body'].user['0'], _this.token);
        }), operators_1.catchError(this.handleError));
    };
    AuthenticationService.prototype.userVerify = function (vkey, token) {
        return this.httpClient
            .get(this.baseUrl + "/verify/vkey/" + vkey, httpOptions)
            .subscribe(function (response) {
            console.log(response);
        });
    };
    AuthenticationService.prototype.getToken = function () {
        return localStorage.getItem('token') != null
            ? localStorage.getItem('token')
            : '';
    };
    AuthenticationService.prototype.logOut = function () {
        this.auth = false;
    };
    AuthenticationService.prototype.handleError = function (errorRes) {
        return rxjs_1.throwError('An unknown error occurs');
    };
    AuthenticationService.prototype.autoLogin = function () {
        var userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        var loadedUser = new user_model_1.User(userData.uid, userData.name, userData.username, userData.status, userData.verrified, userData.vkey, userData.created, userData.changed, userData.access, userData.login, userData.mid, userData.manageUsers, userData.user_roles, userData.user_meta);
        if (loadedUser) {
            this.user.next(loadedUser);
        }
    };
    AuthenticationService.prototype.handleAuth = function (userData, token) {
        var user = new user_model_1.User(userData.uid, userData.name, userData.username, userData.status, userData.verrified, userData.vkey, userData.created, userData.changed, userData.access, userData.login, userData.mid, userData.manageUsers, userData.user_roles, userData.user_meta);
        this.user.next(user);
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(user));
        console.log('Inside on Auth');
        console.log(userData);
    };
    AuthenticationService.prototype.logout = function () {
        this.user.next(null);
        this.router.navigate(['/admin/login']);
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
    };
    AuthenticationService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
