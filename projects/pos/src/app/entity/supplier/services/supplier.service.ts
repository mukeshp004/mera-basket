import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractApiService } from 'projects/common-lib/src/lib/shared/services/abstract-api.srvice';
import { ISupplier } from '../../../shared/models/supplier';

@Injectable({
  providedIn: 'root',
})
export class SupplierService extends AbstractApiService<ISupplier> {
  relativeUrl = 'suppliers';

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
