import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductAddComponent } from './product-add/product-add.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ProductListComponent, ProductAddComponent],
  imports: [CommonModule, SharedModule, ProductRoutingModule, NgbNavModule],
})
export class ProductModule {}
