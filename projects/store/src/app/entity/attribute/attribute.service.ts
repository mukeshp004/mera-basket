import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAttribute } from '../../shared/models/attributes/attribute';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AttributeService extends ApiService<IAttribute> {
  constructor(protected override http: HttpClient) {
    super(http);
    this.relativeUrl = 'attributes';
  }
}
