import { EMPTY, map, mergeMap, Observable, of } from 'rxjs';
import { IProduct, IProductFindResponse, Product } from './../../../shared/models/product';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { AttributeFamilyService } from '../../attribute-family/services/attribute-family.service';
import { IAttributeFamily } from '../../../shared/models/attributes/attribute-family';

@Injectable({
  providedIn: 'root',
})
export class ProductResolveService implements Resolve<IProductFindResponse> {
  constructor(
    protected productService: ProductService,
    private attributeFamilyService: AttributeFamilyService,
    protected router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductFindResponse> {
    // const id = route.paramMap.get('id');
    const id = route.params['id'];
    if (id) {
      return this.productService.find(id).pipe(
        mergeMap((product: IProduct) => {
          if (product) {
            return this.attributeFamilyService.find(product.attribute_family_id as number).pipe(map((attributeFamily: IAttributeFamily) => {
              return {
                product: product,
                attributeFamily: attributeFamily
              }
            }));
            return of({
              product: {},
              attributeFamily: {}
            });
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of({
      product: {},
      attributeFamily: {}
    });
  }
}
