import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { TaxService } from '../services/tax.service';
import { TaxGridService } from '../services/tax-grid.service';
import { ActionButtonCellRendererComponent } from '../../../shared/components/ag-grid/cell-renderer/action-button-cell-renderer/action-button-cell-renderer.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { Tax } from '../../../shared/models/tax';

@Component({
  selector: 'app-tax-list',
  templateUrl: './tax-list.component.html',
  styleUrls: ['./tax-list.component.scss']
})
export class TaxListComponent  implements OnInit {
  
  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;
  gridOptions!: GridOptions;
  defaultColDef!: ColDef;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private taxService: TaxService,
    private taxGridService: TaxGridService) {
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

    const columns = this.taxGridService.getColumns();

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
    this.router.navigate([`tax/edit/${params.data.id}`]);
  };

  deleteCategory = (params: any) => {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.msg = 'Do you want to delete inventory source';
    modalRef.closed.subscribe((response) => {
      console.log(response);
      this.taxService.delete(params.data.id).subscribe(() => {
        this.toastr.success('Inventory Source Deleted!', 'Success');
      });
    });
  };

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridColumnApi.autoSizeAllColumns();
    this.taxService.get().subscribe((taxes: Tax[]) => {
      this.gridApi.setRowData(taxes);
    });
  }

}