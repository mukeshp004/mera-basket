import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxBarcodeModule } from 'ngx-barcode';
import { SharedModule } from '../../shared/shared.module';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductBarcodeComponent } from './product-barcode/product-barcode.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductAddComponent,
    ProductBarcodeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
    NgbNavModule,
    NgxBarcodeModule,
  ],
})
export class ProductModule {}
