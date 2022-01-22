import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryResolveService } from './category-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent
  },
  {
    path: 'add',
    component: CategoryAddComponent,
    resolve: { category: CategoryResolveService }
  },
  {
    path: 'edit/:id',
    component: CategoryAddComponent,
    resolve: { category: CategoryResolveService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
