import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaxService  extends ApiService<any> {
  constructor(protected override http:HttpClient) {
    super(http)
    this.relativeUrl = 'taxes';
  }
}