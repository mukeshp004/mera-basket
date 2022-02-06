import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../../../shared/models/product';
import { ApiService } from '../../../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ApiService<IProduct> {
  constructor(protected override http: HttpClient) {
    super(http);
    this.relativeUrl = 'products';
  }
}
