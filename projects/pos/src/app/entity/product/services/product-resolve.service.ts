import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, mergeMap, Observable, of } from 'rxjs';
import { IProduct, Product } from '../../../shared/models/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolveService implements Resolve<any> {
  constructor(
    protected productService: ProductService,
    protected router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProduct> {
    // const id = route.paramMap.get('id');
    const id = route.params['id'];
    console.log(id);
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
