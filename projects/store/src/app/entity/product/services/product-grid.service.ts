import { PRODUCT_TYPE } from './../../../shared/enums/product-type.enum';
import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import {
  ProductColumn,
  ProductColumnLabel,
} from '../../../shared/enums/columns/product-columns.enum';

@Injectable({
  providedIn: 'root',
})
export class ProductGridService {
  getColumns(): ColDef[] {
    const columns: ColDef[] = [
      {
        headerName: 'Action',
        cellRenderer: 'actionButton',
        cellRendererParams: {},
      },
      { headerName: ProductColumnLabel.SKU, field: ProductColumn.SKU },
      { headerName: ProductColumnLabel.NAME, field: ProductColumn.NAME },
      { headerName: ProductColumnLabel.NUMBER, field: ProductColumn.NUMBER },
      {
        headerName: ProductColumnLabel.TYPE,
        field: ProductColumn.TYPE,
        valueGetter: (params) => {
          return PRODUCT_TYPE[params.data.type];
        },
      },
      {
        headerName: ProductColumnLabel.ATTRIBUTE_FAMILY,
        field: ProductColumn.ATTRIBUTE_FAMILY,

        valueGetter: (params) => {
          return params.data['attribute_family']['name'] || '';
        },
      },
      { headerName: ProductColumnLabel.PRICE, field: ProductColumn.PRICE },
      {
        headerName: ProductColumnLabel.QUANTITY,
        field: ProductColumn.QUANTITY,
      },
      { headerName: ProductColumnLabel.STATUS, field: ProductColumn.STATUS },
    ];

    return columns;
  }
}
