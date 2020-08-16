import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { FullWidthComponent } from './fullwidth.component';
import { LoginComponent } from '../../auth/component/login/login.component';
import { RegisterComponent } from 'src/app/auth/component/register/register.component';

@NgModule({
  declarations: [
    FullWidthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FullWidthModule { }
