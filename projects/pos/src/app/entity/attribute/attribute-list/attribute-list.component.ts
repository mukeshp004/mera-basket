import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GridApi, ColumnApi, GridOptions, ColDef } from 'ag-grid-community';
import { AttributeService } from '../services/attribute.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionButtonCellRendererComponent } from 'projects/common-lib/src/lib/shared/components/ag-grid/cell-renderer/action-button-cell-renderer/action-button-cell-renderer.component';
import { AttributeGridService } from '../services/attribute-grid.service';
import { ConfirmModalComponent } from 'projects/common-lib/src/lib/shared/components/confirm-modal/confirm-modal.component';
import { Attribute } from '../../../shared/models/attribute';

@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.scss'],
})
export class AttributeListComponent {
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
      getRowNodeId: (data) => data?.id,
      components: {
        actionButtons: ActionButtonCellRendererComponent,
      },
    };
  }

  edit = (params: any) => {
    this.router.navigate([`entity/attribute/edit/${params.data.id}`]);
  };

  delete = (params: any) => {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.msg = 'Do you want to delete attribute';
    modalRef.closed.subscribe((response) => {
      this.attributeService.delete(params.data.id).subscribe(() => {
        const row = this.gridApi.getRowNode(params.data.id);
        this.gridApi.applyTransactionAsync({ remove: [row] });
        this.toastr.success('Attrubute Deleted!', 'Success');
      });
    });
  };

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridColumnApi.autoSizeAllColumns();
    this.attributeService.get().subscribe((attributes: Attribute[]) => {
      this.gridApi.setRowData(attributes);
    });
  }
}
