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

  generateConfigurableProduct(selecteAttributes: any) {
    let results: any[] = [];

    for (const key in selecteAttributes) {
      const values = selecteAttributes[key];

      if (!values || (Array.isArray(values) && values.length === 0)) {
        continue;
      }

      if (results.length === 0) {
        values.forEach((value: any) => {
          const item: any = {};
          item[`${key}`] = value;
          results.push(item);
        });
      } else {
        const append: any[] = [];

        results.forEach((result) => {
          values.forEach((value: any) => {
            const item: any = { ...result };
            item[`${key}`] = value;

            append.push(item);
          });
        });

        results = [...append];
      }
    }

    return results;
  }
}
