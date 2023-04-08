import { Injectable } from '@angular/core';
import { ColDef, ColGroupDef, ValueGetterParams } from 'ag-grid-community';

@Injectable({
  providedIn: 'root',
})
export class PurchaseItemGridService {
  constructor() {}

  getColumns(): ColDef[] {
    const columns: (ColDef | ColGroupDef)[] = [
      {
        headerName: 'Action',
        cellRenderer: 'actionButtons',
        maxWidth: 80,
        // cellRendererParams: {},
      },
      {
        headerName: 'Name',
        field: 'name',
        maxWidth: 150,
        valueGetter: (params: ValueGetterParams) => {
          return params.data.product.name;
        },
      },
      {
        headerName: 'Color',
        field: 'color',
        // editable: true,
        valueGetter: (params: ValueGetterParams) => {
          return params.data.product.color;
        },
      },
      {
        headerName: 'Size',
        field: 'size',
        // editable: true,
        valueGetter: (params: ValueGetterParams) => {
          return params.data.product.size;
        },
      },
      {
        headerName: 'Quantity',
        field: 'quantity',
        filter: 'agNumberColumnFilter',
        editable: true,
      },
      {
        headerName: 'Price',
        field: 'price',
        filter: 'agNumberColumnFilter',
        editable: true,
        valueGetter: (params: ValueGetterParams) => {
          return (+params.data.price).toFixed(2);
        },
      },
      {
        headerName: 'Discount',
        children: [
          {
            headerName: 'Amont',
            filter: 'agNumberColumnFilter',
            field: 'discount',
            editable: true,
          },
          {
            headerName: ' %',
            field: 'discount_percentage',
            filter: 'agNumberColumnFilter',
            editable: true,
          },
        ],
      },
      {
        headerName: 'Total',
        field: 'total',
        filter: 'agNumberColumnFilter',
        valueGetter: (params: ValueGetterParams) => {
          return parseFloat(params.data.total).toFixed(2);
        },
      },
    ];

    return columns;
  }
}
