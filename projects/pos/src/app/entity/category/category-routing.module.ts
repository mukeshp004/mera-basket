import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent,
  },
  // {
  //   path: 'add',
  //   component: CategoryAddComponent,
  //   resolve: { entity: CategoryResolveService },
  // },
  // {
  //   path: 'edit/:id',
  //   component: CategoryAddComponent,
  //   resolve: { entity: CategoryResolveService },
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
