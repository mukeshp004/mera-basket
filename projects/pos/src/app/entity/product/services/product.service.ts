import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractApiService } from 'projects/common-lib/src/lib/shared/services/abstract-api.srvice';
import { Observable } from 'rxjs';
import { IProduct } from '../../../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends AbstractApiService<IProduct> {
  public relativeUrl: string = 'products';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  search(params: any): Observable<IProduct[]> {
    return this.get(params, `${this.relativeUrl}/search`);
  }
}
