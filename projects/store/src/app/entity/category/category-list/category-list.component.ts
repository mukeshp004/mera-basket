import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ColDef,
  ColumnApi,
  GridApi,
  GridOptions,
  GridParams,
} from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ActionButtonCellRendererComponent } from '../../../shared/components/ag-grid/cell-renderer/action-button-cell-renderer/action-button-cell-renderer.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { ApiUrlService } from '../../../shared/configs/api-url.service';
import { Category } from '../../../shared/models/category';
import { CategoryGridService } from '../category-grid.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;
  gridOptions!: GridOptions;
  defaultColDef!: ColDef;

  constructor(
    private router: Router,
    private categoryGridService: CategoryGridService,
    private categoryService: CategoryService,
    private apiUrl: ApiUrlService,
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

    const columns = this.categoryGridService.getColumns();

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
      frameworkComponents: {
        actionButton: ActionButtonCellRendererComponent,
      },
    };
  }

  editCategory = (params: any) => {
    this.router.navigate([`category/edit/${params.data.id}`]);
  };

  deleteCategory = (params: any) => {
    console.log('removeCategory', params.data);
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.msg = 'Do you want to delete category';
    modalRef.closed.subscribe((response) => {
      console.log(response);
      this.categoryService
        .delete(params.data.id)
        .subscribe(() => {
          this.toastr.success('Category Deleted!', 'Success');
        });
    });
  };

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridColumnApi.autoSizeAllColumns();
    this.categoryService.get().subscribe((categories: Category[]) => {
      this.gridApi.setRowData(categories);
    });
  }
}
