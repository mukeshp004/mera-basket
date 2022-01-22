import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../../shared/models/category';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})

export class CategoryService extends ApiService<ICategory> {
  constructor(protected override http:HttpClient) {
    super(http)
    this.relativeUrl = 'categories';
  }

}
