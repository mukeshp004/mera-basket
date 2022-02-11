import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicControlComponent } from './dynamic-control/dynamic-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DynamicControlComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DynamicControlComponent

  ]
})
export class DynamicModule { }
