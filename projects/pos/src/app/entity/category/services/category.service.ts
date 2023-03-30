import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractApiService } from 'projects/common-lib/src/lib/shared/services/abstract-api.srvice';
import { ICategory } from '../../../shared/models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends AbstractApiService<ICategory> {
  relativeUrl = 'categories';

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
