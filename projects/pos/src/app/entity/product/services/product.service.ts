import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractApiService } from 'projects/common-lib/src/lib/shared/services/abstract-api.srvice';
import { IProduct } from '../../../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends AbstractApiService<IProduct> {
  constructor(protected override http: HttpClient) {
    super(http);
    this.relativeUrl = 'products';
  }
}
