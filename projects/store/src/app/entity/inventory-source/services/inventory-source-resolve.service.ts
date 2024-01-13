import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, mergeMap, of } from 'rxjs';
import { InventorySourceService } from './inventory-source.service';
import { IInventorySource, InventorySource } from '../../../shared/models/inventory-source';

export const inventorySourceResolveService: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {
  
  // injecting service
  const inventorySourceService: InventorySourceService = inject(InventorySourceService);
  const id = route.paramMap.get('id');

  console.log(state, id);

  if(!id) return of(new InventorySource());
  
  return inventorySourceService.find(+id).pipe(
    mergeMap((inventorySource: IInventorySource) => {
      if (inventorySource) {
        return of(inventorySource);
      } else {
        // inject(Router).navigate(['404']);
        return EMPTY;
      }
    })
  );
}