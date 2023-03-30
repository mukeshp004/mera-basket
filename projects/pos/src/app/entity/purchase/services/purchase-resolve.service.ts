import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, mergeMap, of, EMPTY } from 'rxjs';
import { ICategory, Category } from '../../../shared/models/category';
import { IPurchase, Purchase } from '../../../shared/models/purchase';
import { PurchaseService } from './purchase.service';

@Injectable({
  providedIn: 'root',
})
export class PurchaseResolveService implements Resolve<any> {
  constructor(
    protected purchaseService: PurchaseService,
    protected router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICategory> {
    // const id = route.paramMap.get('id');
    const id = route.params['id'];
    if (id) {
      return this.purchaseService.find(id).pipe(
        mergeMap((purchase: IPurchase) => {
          if (purchase) {
            return of(purchase);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Purchase());
  }
}
