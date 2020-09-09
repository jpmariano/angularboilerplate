import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';
import { DropdownDirective } from './dropdown.directive';
import { RemoveUnderscorePipe } from './remove-underscore.pipe';
import { SortByPipe } from './sortby.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ModalComponent,
    DropdownDirective,
    RemoveUnderscorePipe,
    SortByPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ModalComponent,
    RemoveUnderscorePipe,
    SortByPipe
  ]
})
export class SharedModule { }
