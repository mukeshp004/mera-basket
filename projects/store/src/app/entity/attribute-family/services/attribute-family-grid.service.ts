import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import {
  AttributeFamilyColumn,
  AttributeFamilyColumnLabel,
} from '../../../shared/enums/columns/attribute-family-columns.enum';
import { YES_NO } from '../../../shared/enums/columns/yes-no.enum';

@Injectable({
  providedIn: 'root',
})
export class AttributeFamilyGridService {
  constructor() {}

  getColumns(): ColDef[] {
    const columns: ColDef[] = [
      {
        headerName: 'Action',
        cellRenderer: 'actionButton',
        cellRendererParams: {},
      },
      {
        headerName: AttributeFamilyColumnLabel.NAME,
        field: AttributeFamilyColumn.NAME,
      },
      {
        headerName: AttributeFamilyColumnLabel.CODE,
        field: AttributeFamilyColumn.CODE,
      },
      {
        headerName: AttributeFamilyColumnLabel.STATUS,
        field: AttributeFamilyColumn.CODE,
        valueGetter: (params) => {
          return params.data.show_in_menu === 1 ? YES_NO.YES : YES_NO.NO;
        },
      },
    ];

    return columns;
  }
}
