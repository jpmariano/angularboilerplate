import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { FullWidthModule } from './layouts/fullwidth/fullwidth.module';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/authentication-interceptor.service';
import { PermissionAddComponent } from './modules/permissions/permission-add/permission-add.component';
import { RoleAddComponent } from './modules/roles/role-add/role-add.component';
import { RoleDetailsComponent } from './modules/roles/role-details/role-details.component';
import { RoleEditComponent } from './modules/roles/role-edit/role-edit.component';
import { RoleDeleteComponent } from './modules/roles/role-delete/role-delete.component';
import { UsersListComponent } from './modules/users/users-list/users-list.component';


@NgModule({
  declarations: [AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DefaultModule,
    FullWidthModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
