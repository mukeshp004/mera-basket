import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Injectable({
  providedIn: 'root',
})
export class AttributeGridService {
  constructor() {}

  getColumns(): ColDef[] {
    const columns: ColDef[] = [];

    return columns;
  }
}
