import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventorySourceListComponent } from './inventory-source-list/inventory-source-list.component';
import { InventorySourceUpsertComponent } from './inventory-source-upsert/inventory-source-upsert.component';
import { inventorySourceResolveService } from './services/inventory-source-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: InventorySourceListComponent,
  },
  {
    path: 'add',
    component: InventorySourceUpsertComponent,
    resolve: { entity: inventorySourceResolveService },
  },
  {
    path: 'edit/:id',
    component: InventorySourceUpsertComponent,
    resolve: { entity: inventorySourceResolveService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventorySourceRoutingModule {}
