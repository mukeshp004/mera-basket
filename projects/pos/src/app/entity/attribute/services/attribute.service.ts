import { Injectable } from '@angular/core';
import { AbstractApiService } from 'projects/common-lib/src/lib/shared/services/abstract-api.srvice';
import { IAttribute } from '../../../shared/models/attribute';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AttributeService extends AbstractApiService<IAttribute> {
  relativeUrl = 'attributes';

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
