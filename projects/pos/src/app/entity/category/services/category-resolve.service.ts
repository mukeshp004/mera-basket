import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, mergeMap, Observable, of } from 'rxjs';
import { Category, ICategory } from './../../../shared/models/category';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryResolveService implements Resolve<any> {
  constructor(
    protected categoryService: CategoryService,
    protected router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICategory> {
    // const id = route.paramMap.get('id');
    const id = route.params['id'];
    console.log(id);
    if (id) {
      return this.categoryService.find(id).pipe(
        mergeMap((category: ICategory) => {
          if (category) {
            return of(category);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Category());
  }
}
