import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { PurchaseAddComponent } from './purchase-add/purchase-add.component';
import { SharedModule } from '../../shared/shared.module';
import { PurchaseItemGridComponent } from './purchase-item-grid/purchase-item-grid.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PurchaseListComponent,
    PurchaseAddComponent,
    PurchaseItemGridComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PurchaseRoutingModule,
    NgbDatepickerModule,
  ],
})
export class PurchaseModule {}
