import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'inventory-source',
          loadChildren: () =>
            import('./inventory-source/inventory-source.module').then((m) => m.InventorySourceModule),
      },
      {
        path: 'tax',
          loadChildren: () =>
            import('./tax/tax.module').then((m) => m.TaxModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntityRoutingModule { }
