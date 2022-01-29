import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import {
  AttributeColumn,
  AttributeColumnLabel,
} from '../../shared/enums/columns/attribute-columns.enum';
import { YES_NO } from '../../shared/enums/columns/yes-no.enum';

@Injectable({
  providedIn: 'root',
})
export class AttributeGridService {
  constructor() {}

  getColumns(): ColDef[] {
    const columns: ColDef[] = [
      {
        headerName: 'Action',
        cellRenderer: 'actionButton',
        cellRendererParams: {},
      },
      { headerName: AttributeColumnLabel.NAME, field: AttributeColumn.NAME },
      { headerName: AttributeColumnLabel.CODE, field: AttributeColumn.CODE },
      {
        headerName: AttributeColumnLabel.STATUS,
        field: AttributeColumn.CODE,
        valueGetter: (params) => {
          return params.data.show_in_menu === 1 ? YES_NO.YES : YES_NO.NO;
        },
      },
    ];

    return columns;
  }
}
