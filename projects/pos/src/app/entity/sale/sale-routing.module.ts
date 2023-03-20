import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesListComponent } from './sales-list/sales-list.component';

const routes: Routes = [
  {
    path: '',
    component: SalesListComponent,
  },
  // {
  //   path: 'add',
  // component: SaleListComponent,
  //   resolve: { entity: CategoryResolveService },
  // },
  // {
  //   path: 'edit/:id',
  //   component: PurchaseAddComponent,
  //   resolve: { entity: CategoryResolveService },
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleRoutingModule {}
