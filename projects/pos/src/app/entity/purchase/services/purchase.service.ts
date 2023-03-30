import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractApiService } from 'projects/common-lib/src/lib/shared/services/abstract-api.srvice';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService extends AbstractApiService<any> {
  public relativeUrl: string = 'purchases';

  constructor(protected override http: HttpClient) {
    super(http);
  }
}