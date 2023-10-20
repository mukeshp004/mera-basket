import { EMPTY, forkJoin, map, mergeMap, Observable, of } from 'rxjs';
import {
  IProduct,
  IProductFindResponse,
  Product,
} from './../../../shared/models/product';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { AttributeFamilyService } from '../../attribute-family/services/attribute-family.service';
import { IAttributeFamily } from '../../../shared/models/attributes/attribute-family';
import { InventorySourceService } from '../../inventory-source/services/inventory-source.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolveService implements Resolve<IProductFindResponse> {
  constructor(
    protected productService: ProductService,
    private attributeFamilyService: AttributeFamilyService,
    private inventorySourceService: InventorySourceService,
    protected router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductFindResponse> {
    const id = route.params['id'];

    return this.getData(id).pipe(
      map((response) => {
        const attributeFamilies = response[0];
        const product = response[1];
        const inventorySources = response[2]

        let attributeFamily;
        if (product) {
          attributeFamily = attributeFamilies.find(
            (family: IAttributeFamily) =>
              family.id === product.attribute_family_id
          );
        }

        const data = {
          attributeFamilies: attributeFamilies,
          product: product,
          attributeFamily: attributeFamily,
          inventorySources: inventorySources
        };

        return data;
      })
    );
  }

  getData(id: number): Observable<any> {
    let $product: Observable<IProduct | undefined> = of(undefined);
    const $attributeFamilies = this.getFamilies();
    const $inventorySources = this.getInventorySources();

    if (id) {
      $product = this.getProduct(id);
    }

    return forkJoin([
      // gets Attribute families
      $attributeFamilies,
      // get given product
      $product,
      $inventorySources
    ]);
  }

  getProduct(id: number) {
    return this.productService.find(id);
  }

  getFamilies() {
    return this.attributeFamilyService.get();
  }

  getInventorySources() {
    return this.inventorySourceService.get();
  }
}
