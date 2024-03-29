import { ProductAddFormlyComponent } from './product-add-formly/product-add-formly.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductUpsertComponent } from './product-upsert/product-upsert.component';
import { ProductResolveService } from './services/product-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'add',
    component: ProductUpsertComponent,
    // resolve: { entity: ProductResolveService },
  },
  {
    path: 'add-formly',
    component: ProductAddFormlyComponent,
    // resolve: { entity: ProductResolveService },
  },
  {
    path: 'edit/:id',
    component: ProductAddFormlyComponent,
    resolve: { entity: ProductResolveService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
