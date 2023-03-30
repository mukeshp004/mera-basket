import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridApi, ColumnApi, GridOptions, ColDef } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ActionButtonCellRendererComponent } from 'projects/common-lib/src/lib/shared/components/ag-grid/cell-renderer/action-button-cell-renderer/action-button-cell-renderer.component';
import { ConfirmModalComponent } from 'projects/common-lib/src/lib/shared/components/confirm-modal/confirm-modal.component';
import { Category } from '../../../shared/models/category';
import { SupplierGridService } from '../services/supplier-grid.service';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss'],
})
export class SupplierListComponent implements OnInit {
  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;
  gridOptions!: GridOptions;
  defaultColDef!: ColDef;

  constructor(
    private router: Router,
    private supplierGridService: SupplierGridService,
    private supplierService: SupplierService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.setGridOptions();
  }

  setGridOptions(): void {
    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      filter: true,
      sortable: true,
      floatingFilter: true,
    };

    const columns = this.supplierGridService.getColumns();

    columns
      .filter((col) => col.headerName === 'Action')
      .map((col) => {
        col.sortable = false;
        col.pinned = true;
        col.filter = false;
        col.cellRendererParams = {
          buttons: [
            {
              label: '',
              icon: '<i class="fas fa-edit"></i>',
              class: 'btn btn-sm btn-primary',
              onClick: this.editCategory,
            },
            {
              label: 'X',
              icon: '<i class="fas fa-trash"></i>',
              class: 'btn btn-sm btn-danger',
              onClick: this.deleteCategory,
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
    };
  }

  editCategory = (params: any) => {
    this.router.navigate([`entity/supplier/edit/${params.data.id}`]);
  };

  deleteCategory = (params: any) => {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.msg = 'Do you want to delete supplier';
    modalRef.closed.subscribe((response) => {
      this.supplierService.delete(params.data.id).subscribe(() => {
        const row = this.gridApi.getRowNode(params.data.id);
        this.gridApi.applyTransactionAsync({ remove: [row] });
        this.toastr.success('Supplier Deleted!', 'Success');
      });
    });
  };

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridColumnApi.autoSizeAllColumns();
    this.supplierService.get().subscribe((categories: Category[]) => {
      this.gridApi.setRowData(categories);
    });
  }
}
