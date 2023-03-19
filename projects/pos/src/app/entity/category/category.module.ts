import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CategoryAddComponent } from './category-add/category-add.component';

@NgModule({
  declarations: [CategoryListComponent, CategoryAddComponent],
  imports: [CommonModule, CategoryRoutingModule, SharedModule],
})
export class CategoryModule {}
