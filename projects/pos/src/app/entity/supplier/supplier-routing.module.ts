import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierResolveService } from './services/supplier-resolve.service';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';

const routes: Routes = [
  {
    path: '',
    component: SupplierListComponent,
  },
  {
    path: 'add',
    component: SupplierAddComponent,
    resolve: { entity: SupplierResolveService },
  },
  {
    path: 'edit/:id',
    component: SupplierAddComponent,
    resolve: { entity: SupplierResolveService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierRoutingModule {}
