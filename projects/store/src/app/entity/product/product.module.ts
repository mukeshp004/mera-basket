import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductUpsertComponent } from './product-upsert/product-upsert.component';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductAddFormlyComponent } from './product-add-formly/product-add-formly.component';

@NgModule({
  declarations: [ProductListComponent, ProductUpsertComponent, ProductAddFormlyComponent],
  imports: [CommonModule, SharedModule, ProductRoutingModule, NgbModule],
})
export class ProductModule {}
