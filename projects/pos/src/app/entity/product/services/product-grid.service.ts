import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { YES_NO } from 'projects/store/src/app/shared/enums/columns/yes-no.enum';
import {
  ProductColumn,
  ProductColumnLabel,
} from '../../../shared/enums/columns/product-columns.enum';

@Injectable({
  providedIn: 'root',
})
@Injectable({
  providedIn: 'root',
})
export class ProductGridService {
  constructor() {}

  getColumns(): ColDef[] {
    const columns: ColDef[] = [
      {
        headerName: 'Action',
        cellRenderer: 'actionButtons',
        cellRendererParams: {},
      },
      {
        headerName: ProductColumnLabel.NAME,
        field: ProductColumn.NAME,
        suppressColumnsToolPanel: false,
      },
      { headerName: ProductColumnLabel.SLUG, field: ProductColumn.SLUG },
      {
        headerName: ProductColumnLabel.SKU,
        field: ProductColumn.SKU,
      },
      {
        headerName: ProductColumnLabel.IS_NEW,
        field: ProductColumn.IS_NEW,
      },
      {
        headerName: ProductColumnLabel.QUANTITY,
        field: ProductColumn.QUANTITY,
      },
      {
        headerName: ProductColumnLabel.COST,
        field: ProductColumn.COST,
      },
      {
        headerName: ProductColumnLabel.MRP,
        field: ProductColumn.MRP,
      },
      {
        headerName: ProductColumnLabel.PRICE,
        field: ProductColumn.PRICE,
      },
      {
        headerName: ProductColumnLabel.SIZE,
        field: ProductColumn.SIZE,
      },
      {
        headerName: ProductColumnLabel.COLOR,
        field: ProductColumn.COLOR,
      },
      {
        headerName: ProductColumnLabel.STATUS,
        field: ProductColumn.STATUS,
        valueGetter: (params) => {
          return params.data.status === 1 ? 'Active' : 'Inactive';
        },
      },
    ];

    return columns;
  }
}
