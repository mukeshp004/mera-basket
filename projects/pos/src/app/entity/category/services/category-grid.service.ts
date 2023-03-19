import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { YES_NO } from 'projects/store/src/app/shared/enums/columns/yes-no.enum';
import {
  CategoryColumn,
  CategoryColumnLabel,
} from '../../../shared/enums/columns/category-columns.enum';

@Injectable({
  providedIn: 'root',
})
@Injectable({
  providedIn: 'root',
})
export class CategoryGridService {
  constructor() {}

  getColumns(): ColDef[] {
    const columns: ColDef[] = [
      {
        headerName: 'Action',
        cellRenderer: 'actionButtons',
        cellRendererParams: {},
      },
      {
        headerName: CategoryColumnLabel.NAME,
        field: CategoryColumn.NAME,
        suppressColumnsToolPanel: false,
      },
      { headerName: CategoryColumnLabel.SLUG, field: CategoryColumn.SLUG },
      {
        headerName: CategoryColumnLabel.SHOW_IN_MENU,
        field: CategoryColumn.SHOW_IN_MENU,
        valueGetter: (params) => {
          return params.data.show_in_menu === 1 ? YES_NO.YES : YES_NO.NO;
        },
      },
      {
        headerName: CategoryColumnLabel.DISPLAY_MODE,
        field: CategoryColumn.DISPLAY_MODE,
      },
      {
        headerName: CategoryColumnLabel.STATUS,
        field: CategoryColumn.STATUS,
        valueGetter: (params) => {
          return params.data.status === 1 ? 'Active' : 'Inactive';
        },
      },
    ];

    return columns;
  }
}
