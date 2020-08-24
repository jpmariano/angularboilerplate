"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DefaultModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var shared_module_1 = require("../../shared/shared.module");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var default_component_1 = require("./default.component");
var dashboard_component_1 = require("../../modules/dashboard/dashboard.component");
var users_component_1 = require("../../modules/users/users.component");
var user_details_component_1 = require("src/app/modules/users/user-details/user-details.component");
var user_edit_component_1 = require("src/app/modules/users/user-edit/user-edit.component");
var user_delete_component_1 = require("src/app/modules/users/user-delete/user-delete.component");
var user_add_component_1 = require("src/app/modules/users/user-add/user-add.component");
var DefaultModule = /** @class */ (function () {
    function DefaultModule() {
    }
    DefaultModule = __decorate([
        core_1.NgModule({
            declarations: [
                default_component_1.DefaultComponent,
                dashboard_component_1.DashboardComponent,
                users_component_1.UsersComponent,
                user_details_component_1.UserDetailsComponent,
                user_add_component_1.UserAddComponent,
                user_edit_component_1.UserEditComponent,
                user_delete_component_1.UserDeleteComponent,
                users_component_1.RemoveUnderscorePipe
            ],
            imports: [common_1.CommonModule, router_1.RouterModule, shared_module_1.SharedModule, ng_bootstrap_1.NgbAlertModule, forms_1.FormsModule]
        })
    ], DefaultModule);
    return DefaultModule;
}());
exports.DefaultModule = DefaultModule;
