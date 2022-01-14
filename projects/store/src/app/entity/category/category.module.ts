import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryAddComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoryRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class CategoryModule { }
