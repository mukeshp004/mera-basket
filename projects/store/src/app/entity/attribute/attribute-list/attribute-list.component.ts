import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ActionButtonCellRendererComponent } from '../../../shared/components/ag-grid/cell-renderer/action-button-cell-renderer/action-button-cell-renderer.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { Attribute } from '../../../shared/models/attributes/attribute';
import { AttributeGridService } from '../attribute-grid.service';
import { AttributeService } from '../attribute.service';

@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.scss'],
})
export class AttributeListComponent implements OnInit {
  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;
  gridOptions!: GridOptions;
  defaultColDef!: ColDef;

  constructor(
    private router: Router,
    private attributeGridService: AttributeGridService,
    private attributeService: AttributeService,
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

    const columns = this.attributeGridService.getColumns();

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
              onClick: this.edit,
            },
            {
              label: 'X',
              icon: '<i class="fas fa-trash"></i>',
              class: 'btn btn-sm btn-danger',
              onClick: this.delete,
            },
          ],
        };
      });

    this.gridOptions = {
      defaultColDef: this.defaultColDef,
      columnDefs: columns,
      frameworkComponents: {
        actionButton: ActionButtonCellRendererComponent,
      },
    };
  }

  edit = (params: any) => {
    this.router.navigate([`attribute/edit/${params.data.id}`]);
  };

  delete = (params: any) => {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.msg = 'Do you want to delete Attribute';
    modalRef.closed.subscribe((response) => {
      console.log(response);
      this.attributeService.delete(params.data.id).subscribe(() => {
        this.toastr.success('Attribute Deleted!', 'Success');
      });
    });
  };

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridColumnApi.autoSizeAllColumns();
    this.attributeService.get().subscribe((categories: Attribute[]) => {
      this.gridApi.setRowData(categories);
    });
  }
}
