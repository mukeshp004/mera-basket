import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductResolveService } from './services/product-resolve.service';
import { ProductBarcodeComponent } from './product-barcode/product-barcode.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'add',
    component: ProductAddComponent,
    resolve: { entity: ProductResolveService },
  },
  {
    path: 'edit/:id',
    component: ProductAddComponent,
    resolve: { entity: ProductResolveService },
  },
  {
    path: 'barcode',
    component: ProductBarcodeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
