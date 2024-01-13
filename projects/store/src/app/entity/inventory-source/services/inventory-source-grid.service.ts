import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import {
  InventorySourceColumn,
  InventorySourceColumnLabel,
} from '../../../shared/enums/columns/inventory-source-column.enum';
import { YES_NO } from '../../../shared/enums/columns/yes-no.enum';

@Injectable({
  providedIn: 'root',
})
export class InventorySourceGridService {
  constructor() {}

  getColumns(): ColDef[] {
    const columns: ColDef[] = [
      {
        headerName: 'Action',
        cellRenderer: 'actionButton',
        cellRendererParams: {},
      },
      {
        headerName: InventorySourceColumnLabel.CODE,
        field: InventorySourceColumn.CODE,
      },
      {
        headerName: InventorySourceColumnLabel.NAME,
        field: InventorySourceColumn.NAME,
      },

      {
        headerName: InventorySourceColumnLabel.PRIORITY,
        field: InventorySourceColumn.PRIORITY,
      },
      {
        headerName: InventorySourceColumnLabel.STATUS,
        field: InventorySourceColumn.STATUS,
        valueGetter: (params) => {
          return params.data.show_in_menu === 1 ? YES_NO.YES : YES_NO.NO;
        },
      },
    ];

    return columns;
  }
}
