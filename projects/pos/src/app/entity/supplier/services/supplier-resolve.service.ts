import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, mergeMap, of, EMPTY } from 'rxjs';
import { ISupplier, Supplier } from '../../../shared/models/supplier';
import { SupplierService } from './supplier.service';

@Injectable({
  providedIn: 'root',
})
export class SupplierResolveService implements Resolve<any> {
  constructor(
    protected supplierService: SupplierService,
    protected router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISupplier> {
    const id = route.params['id'];
    if (id) {
      return this.supplierService.find(id).pipe(
        mergeMap((supplier: ISupplier) => {
          if (supplier) {
            return of(supplier);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Supplier());
  }
}
