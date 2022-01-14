import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder.directive';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownDirective,
    PlaceholderDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [ // You only need to export components (,directives, pipes) and modules. No need for services!
    CommonModule,
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownDirective,
    PlaceholderDirective,
  ]
})
export class SharedModule { }
