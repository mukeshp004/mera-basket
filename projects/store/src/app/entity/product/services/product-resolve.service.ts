import { EMPTY, mergeMap, Observable, of } from 'rxjs';
import { IProduct, Product } from './../../../shared/models/product';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProductService } from './product.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductResolveService implements Resolve<IProduct> {
  constructor(
    protected productService: ProductService,
    protected router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProduct> {
    // const id = route.paramMap.get('id');
    const id = route.params['id'];
    if (id) {
      return this.productService.find(id).pipe(
        mergeMap((product: IProduct) => {
          if (product) {
            return of(product);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Product());
  }
}
