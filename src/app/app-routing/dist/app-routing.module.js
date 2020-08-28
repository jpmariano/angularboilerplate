"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var default_component_1 = require("../layouts/default/default.component");
var dashboard_component_1 = require("../modules/dashboard/dashboard.component");
var users_component_1 = require("../modules/users/users.component");
var fullwidth_component_1 = require("../layouts/fullwidth/fullwidth.component");
var login_component_1 = require("../auth/component/login/login.component");
var register_component_1 = require("../auth/component/register/register.component");
var authentication_guard_1 = require("../auth/authentication.guard");
var loggedin_auth_guard_1 = require("../auth/loggedin-auth.guard");
var routes = [
    {
        path: 'admin',
        component: default_component_1.DefaultComponent,
        canActivate: [authentication_guard_1.AuthGuard],
        children: [{
                path: 'dashboard',
                component: dashboard_component_1.DashboardComponent
            },
            {
                path: 'users',
                component: users_component_1.UsersComponent
            }
        ]
    },
    {
        path: 'admin',
        component: fullwidth_component_1.FullWidthComponent,
        canActivate: [loggedin_auth_guard_1.LoggedInAuthGuard],
        children: [{
                path: 'login',
                component: login_component_1.LoginComponent
            }, {
                path: 'register',
                component: register_component_1.RegisterComponent
            }]
    },
    { path: 'admin', redirectTo: '/admin/dashboard' },
    { path: '**', redirectTo: '/admin/dashboard' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes)
            ],
            exports: [
                router_1.RouterModule
            ],
            declarations: []
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
