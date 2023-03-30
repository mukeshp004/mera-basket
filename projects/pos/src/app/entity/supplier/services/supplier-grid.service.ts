import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import {
  SupplierColumn,
  SupplierColumnLabel,
} from '../../../shared/enums/columns/supplier-columns.enum';

@Injectable({
  providedIn: 'root',
})
export class SupplierGridService {
  constructor() {}
  getColumns(): ColDef[] {
    const columns: ColDef[] = [
      {
        headerName: 'Action',
        cellRenderer: 'actionButtons',
        cellRendererParams: {},
      },
      {
        headerName: SupplierColumnLabel.NAME,
        field: SupplierColumn.NAME,
        suppressColumnsToolPanel: false,
      },
      {
        headerName: SupplierColumnLabel.EMAIL,
        field: SupplierColumn.EMAIL,
        suppressColumnsToolPanel: false,
      },
      {
        headerName: SupplierColumnLabel.PHONE,
        field: SupplierColumn.PHONE,
        suppressColumnsToolPanel: false,
      },
      {
        headerName: SupplierColumnLabel.STATUS,
        field: SupplierColumn.STATUS,
        valueGetter: (params) => {
          return params.data.status === 1 ? 'Active' : 'Inactive';
        },
      },
    ];

    return columns;
  }
}
