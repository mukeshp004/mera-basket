import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRoutingModule } from './sale-routing.module';
import { SalesAddComponent } from './sales-add/sales-add.component';
import { SalesListComponent } from './sales-list/sales-list.component';

@NgModule({
  declarations: [SalesAddComponent, SalesListComponent],
  imports: [CommonModule, SaleRoutingModule],
})
export class SaleModule {}
