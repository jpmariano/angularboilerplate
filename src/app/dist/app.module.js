"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var app_routing_module_1 = require("./app-routing/app-routing.module");
var animations_1 = require("@angular/platform-browser/animations");
var default_module_1 = require("./layouts/default/default.module");
var fullwidth_module_1 = require("./layouts/fullwidth/fullwidth.module");
var app_component_1 = require("./app.component");
var authentication_interceptor_service_1 = require("./auth/authentication-interceptor.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                default_module_1.DefaultModule,
                fullwidth_module_1.FullWidthModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                ng_bootstrap_1.NgbModule,
                forms_1.FormsModule,
            ],
            providers: [
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: authentication_interceptor_service_1.AuthInterceptor,
                    multi: true
                },
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
