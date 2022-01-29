import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, mergeMap, Observable, of } from 'rxjs';
import {
  Attribute,
  IAttribute,
} from '../../shared/models/attributes/attribute';
import { AttributeService } from './attribute.service';

@Injectable({
  providedIn: 'root',
})
export class AttributeResolveService {
  constructor(
    protected router: Router,
    protected attributeService: AttributeService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAttribute> {
    const id = route.params['id'];
    if (id) {
      return this.attributeService.find(id).pipe(
        mergeMap((attribute: IAttribute) => {
          if (attribute) {
            return of(attribute);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Attribute());
  }
}
