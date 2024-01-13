import { Component, OnInit } from '@angular/core';
import { GridApi, ColumnApi, GridOptions, ColDef } from 'ag-grid-community';
import { InventorySourceService } from '../services/inventory-source.service';
import { ActionButtonCellRendererComponent } from '../../../shared/components/ag-grid/cell-renderer/action-button-cell-renderer/action-button-cell-renderer.component';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { InventorySourceGridService } from '../services/inventory-source-grid.service';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { InventorySource } from '../../../shared/models/inventory-source';

@Component({
  selector: 'app-inventory-source-list',
  templateUrl: './inventory-source-list.component.html',
  styleUrls: ['./inventory-source-list.component.scss']
})
export class InventorySourceListComponent implements OnInit{
  
  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;
  gridOptions!: GridOptions;
  defaultColDef!: ColDef;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private inventorySourceService: InventorySourceService,
    private inventorySourceGridService: InventorySourceGridService) {
  }

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

    const columns = this.inventorySourceGridService.getColumns();

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
      components: {
        actionButton: ActionButtonCellRendererComponent,
      },
    };
  }

  editCategory = (params: any) => {
    this.router.navigate([`inventory-source/edit/${params.data.id}`]);
  };

  deleteCategory = (params: any) => {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.msg = 'Do you want to delete inventory source';
    modalRef.closed.subscribe((response) => {
      console.log(response);
      this.inventorySourceService.delete(params.data.id).subscribe(() => {
        this.toastr.success('Inventory Source Deleted!', 'Success');
      });
    });
  };

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridColumnApi.autoSizeAllColumns();
    this.inventorySourceService.get().subscribe((inventorySources: InventorySource[]) => {
      this.gridApi.setRowData(inventorySources);
    });
  }

}
