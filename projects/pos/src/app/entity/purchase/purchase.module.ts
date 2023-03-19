import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';


@NgModule({
  declarations: [
    PurchaseListComponent
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule
  ]
})
export class PurchaseModule { }
