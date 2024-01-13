import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxRoutingModule } from './tax-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TaxListComponent } from './tax-list/tax-list.component';
import { TaxUpsertComponent } from './tax-upsert/tax-upsert.component';


@NgModule({
  declarations: [
    TaxListComponent,
    TaxUpsertComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TaxRoutingModule
  ]
})
export class TaxModule { }
