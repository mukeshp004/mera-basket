import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAttribute } from '../../../shared/models/attributes/attribute';
import { IAttributeFamily } from '../../../shared/models/attributes/attribute-family';
import { ApiService } from '../../../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AttributeFamilyService extends ApiService<IAttributeFamily> {
  constructor(protected override http: HttpClient) {
    super(http);
    this.relativeUrl = 'attribute/families';
  }
}
