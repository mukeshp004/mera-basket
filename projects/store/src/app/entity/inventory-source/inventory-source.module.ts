import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventorySourceListComponent } from './inventory-source-list/inventory-source-list.component';
import { InventorySourceUpsertComponent } from './inventory-source-upsert/inventory-source-upsert.component';
import { InventorySourceRoutingModule } from './inventory-source-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    InventorySourceListComponent,
    InventorySourceUpsertComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InventorySourceRoutingModule,
  ]
})
export class InventorySourceModule { }
