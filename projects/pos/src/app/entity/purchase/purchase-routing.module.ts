import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseAddComponent } from './purchase-add/purchase-add.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseListComponent,
  },
  // {
  //   path: 'add',
  // component: PurchaseAddComponent,
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
export class PurchaseRoutingModule {}
