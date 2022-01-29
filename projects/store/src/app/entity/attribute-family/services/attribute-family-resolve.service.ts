import { Attribute, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, mergeMap, Observable, of } from 'rxjs';
import {
  AttributeFamily,
  IAttributeFamily,
} from '../../../shared/models/attributes/attribute-family';
import { AttributeFamilyService } from './attribute-family.service';

@Injectable({
  providedIn: 'root',
})
export class AttributeFamilyResolveService {
  constructor(
    protected router: Router,
    protected attributeFamilyService: AttributeFamilyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAttributeFamily> {
    const id = route.params['id'];
    if (id) {
      return this.attributeFamilyService.find(id).pipe(
        mergeMap((attribute: IAttributeFamily) => {
          if (attribute) {
            return of(attribute);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AttributeFamily());
  }
}
