import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryRoutingModule } from './category-routing.module';

@NgModule({
  declarations: [CategoryListComponent, CategoryAddComponent],
  imports: [CommonModule, SharedModule, CategoryRoutingModule],
})
export class CategoryModule {}
