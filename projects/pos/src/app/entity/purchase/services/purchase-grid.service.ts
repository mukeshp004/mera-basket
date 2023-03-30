import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import {
  PurchaseColumn,
  PurchaseColumnLabel,
} from '../../../shared/enums/columns/purchase-columns.enum';

@Injectable({
  providedIn: 'root',
})
export class PurchaseGridService {
  constructor() {}

  getColumns(): ColDef[] {
    const columns: ColDef[] = [
      {
        headerName: 'Action',
        cellRenderer: 'actionButtons',
        cellRendererParams: {},
      },
      {
        headerName: PurchaseColumnLabel.QUANTITY,
        field: PurchaseColumn.QUANTITY,
        suppressColumnsToolPanel: false,
      },
      {
        headerName: PurchaseColumnLabel.SUB_TOTAL,
        field: PurchaseColumn.SUB_TOTAL,
      },
      {
        headerName: PurchaseColumnLabel.TAX,
        field: PurchaseColumn.TAX,
      },
      {
        headerName: PurchaseColumnLabel.TOTAL,
        field: PurchaseColumn.TOTAL,
      },
      {
        headerName: PurchaseColumnLabel.STATUS,
        field: PurchaseColumn.STATUS,
        valueGetter: (params) => {
          return params.data.status === 1 ? 'Active' : 'Inactive';
        },
      },
    ];

    return columns;
  }
}
