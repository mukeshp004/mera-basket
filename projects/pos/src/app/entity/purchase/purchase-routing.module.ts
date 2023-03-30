import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseAddComponent } from './purchase-add/purchase-add.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { PurchaseResolveService } from './services/purchase-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: PurchaseListComponent,
  },
  {
    path: 'add',
    component: PurchaseAddComponent,
    resolve: { entity: PurchaseResolveService },
  },
  {
    path: 'edit/:id',
    component: PurchaseAddComponent,
    resolve: { entity: PurchaseResolveService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseRoutingModule {}
