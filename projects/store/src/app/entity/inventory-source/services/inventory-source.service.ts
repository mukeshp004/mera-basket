import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IInventorySource } from '../../../shared/models/inventory-source';
import { ApiService } from '../../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class InventorySourceService extends ApiService<IInventorySource> {
  constructor(protected override http:HttpClient) {
    super(http)
    this.relativeUrl = 'inventory-source';
  }
}
