import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import {
  CategoryColumn,
  CategoryColumnLabel,
} from '../../shared/enums/columns/category-columns.enum';
import { YesNo } from '../../shared/enums/columns/yes-no.enum';

@Injectable({
  providedIn: 'root',
})
export class CategoryGridService {
  constructor() {}

  getColumns(): ColDef[] {
    const columns: ColDef[] = [
      { headerName: CategoryColumnLabel.NAME, field: CategoryColumn.NAME },
      { headerName: CategoryColumnLabel.SLUG, field: CategoryColumn.SLUG },
      {
        headerName: CategoryColumnLabel.SHOW_IN_MENU,
        field: CategoryColumn.SHOW_IN_MENU,
        valueGetter: (params) => {
          return params.data.show_in_menu === 1 ? YesNo.YES: YesNo
        },
      },
      {
        headerName: CategoryColumnLabel.DISPLAY_MODE,
        field: CategoryColumn.DISPLAY_MODE,
      },
    ];

    return columns;
  }
}
