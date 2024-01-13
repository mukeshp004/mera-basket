import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { TaxColumn, TaxColumnLabel } from '../../../shared/enums/columns/tax-column.enum';
import { YES_NO } from '../../../shared/enums/columns/yes-no.enum';

@Injectable({
  providedIn: 'root'
})
export class TaxGridService {

  constructor() { }

  getColumns(): ColDef[] {
    const columns: ColDef[] = [
      {
        headerName: 'Action',
        cellRenderer: 'actionButton',
        cellRendererParams: {},
      },
      {
        headerName: TaxColumnLabel.CODE,
        field: TaxColumn.CODE,
      },
      {
        headerName: TaxColumnLabel.NAME,
        field: TaxColumn.NAME,
      },
      {
        headerName: TaxColumnLabel.STATUS,
        field: TaxColumn.STATUS,
        valueGetter: (params) => {
          return params.data.show_in_menu === 1 ? YES_NO.YES : YES_NO.NO;
        },
      },
    ];

    return columns;
  }
}

