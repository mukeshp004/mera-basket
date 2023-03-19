import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
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
export class ProductRoutingModule {}
