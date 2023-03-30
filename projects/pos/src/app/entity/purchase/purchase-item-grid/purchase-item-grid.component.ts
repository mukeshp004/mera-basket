import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  GridApi,
  ColumnApi,
  GridOptions,
  ColDef,
  RowDataTransaction,
  CellValueChangedEvent,
} from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ActionButtonCellRendererComponent } from 'projects/common-lib/src/lib/shared/components/ag-grid/cell-renderer/action-button-cell-renderer/action-button-cell-renderer.component';
import { ConfirmModalComponent } from 'projects/common-lib/src/lib/shared/components/confirm-modal/confirm-modal.component';
import { CartItem } from '../../../shared/models/cart/cart-item';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-purchase-item-grid',
  templateUrl: './purchase-item-grid.component.html',
  styleUrls: ['./purchase-item-grid.component.scss'],
})
export class PurchaseItemGridComponent implements OnInit, OnChanges {
  @Input() rowData: CartItem[] = [];

  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;
  gridOptions!: GridOptions;
  defaultColDef!: ColDef;

  constructor(
    private cart: CartService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.setGridOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      'rowData' in changes &&
      changes['rowData'].currentValue &&
      this.gridApi
    ) {
      this.gridApi.setRowData(changes['rowData'].currentValue);
    }
  }

  addRow(data: any) {
    const rowDataTransaction = {
      add: [data],
    } as RowDataTransaction;
    this.gridApi.applyTransactionAsync(rowDataTransaction);
  }

  setGridOptions(): void {
    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      filter: true,
      resizable: true,
      sortable: true,
      floatingFilter: true,
    };

    const columns: ColDef[] = this.getColumns();

    columns
      .filter((col) => col.headerName === 'Action')
      .map((col) => {
        col.sortable = false;
        col.pinned = true;
        col.filter = false;
        col.cellRendererParams = {
          buttons: [
            {
              label: 'X',
              icon: '<i class="fas fa-trash"></i>',
              class: 'btn btn-sm btn-danger',
              onClick: this.deleteItem,
            },
          ],
        };
      });

    this.gridOptions = {
      defaultColDef: this.defaultColDef,
      columnDefs: columns,
      getRowNodeId: (data) => data?.id,
      components: {
        actionButtons: ActionButtonCellRendererComponent,
      },
      onCellValueChanged: this.onCellValueChanged,
    };
  }

  deleteItem = (params: any) => {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.msg = 'Do you want to delete category';
    modalRef.closed.subscribe((response) => {
      const row = this.gridApi.getRowNode(params.data.id);
      this.cart.delete(params.data.id);
      // this.gridApi.applyTransactionAsync({ remove: [row] });
    });
  };

  onCellValueChanged = (event: CellValueChangedEvent) => {
    console.log(event);
    const data = event.data;
    const product = data.product;
    this.cart.editItem(
      data.id,
      data.quantity,
      data.price,
      +data.discount,
      +data.discount_percentage
    );
  };

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.autoSizeAllColumns();

    this.gridApi.setRowData([]);
  }

  getColumns(): ColDef[] {
    const columns: ColDef[] = [
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
        valueGetter: (params) => {
          return params.data.product.name;
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
        valueGetter: (params) => {
          return (+params.data.price).toFixed(2);
        },
      },
      {
        headerName: 'Discount',
        filter: 'agNumberColumnFilter',
        field: 'discount',
        editable: true,
      },
      {
        headerName: 'Discount %',
        field: 'discountPercentage',
        filter: 'agNumberColumnFilter',
        editable: true,
      },
      {
        headerName: 'Total',
        field: 'total',
        filter: 'agNumberColumnFilter',
        valueGetter: (params) => {
          return parseFloat(params.data.total).toFixed(2);
        },
      },
    ];

    return columns;
  }
}
