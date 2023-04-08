import { Injectable } from '@angular/core';
import {
  AttributeColumn,
  AttributeColumnLabel,
} from '../../../shared/enums/columns/attribute-columns.enum';
import { ColDef, ValueGetterParams } from 'ag-grid-community';
import { YES_NO } from 'projects/store/src/app/shared/enums/columns/yes-no.enum';

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
      { headerName: AttributeColumnLabel.TYPE, field: AttributeColumn.TYPE },
      {
        headerName: AttributeColumnLabel.SWATCH_TYPE,
        field: AttributeColumn.SWATCH_TYPE,
      },
      {
        headerName: AttributeColumnLabel.STATUS,
        field: AttributeColumn.CODE,
        valueGetter: (params: ValueGetterParams) => {
          return params.data.show_in_menu === 1 ? YES_NO.YES : YES_NO.NO;
        },
      },
    ];

    return columns;
  }
}
