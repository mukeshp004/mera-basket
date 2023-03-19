import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityRoutingModule } from './entity-routing.module';
import { SaleListComponent } from './sale/sale-list/sale-list.component';

@NgModule({
  declarations: [
    SaleListComponent
  ],
  imports: [CommonModule, EntityRoutingModule],
})
export class EntityModule {}
