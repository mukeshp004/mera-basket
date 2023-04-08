import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { PurchaseAddComponent } from './purchase-add/purchase-add.component';
import { PurchaseItemGridComponent } from './purchase-item-grid/purchase-item-grid.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { PurchaseRoutingModule } from './purchase-routing.module';

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
