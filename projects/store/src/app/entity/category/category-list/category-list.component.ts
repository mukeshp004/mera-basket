import { Component, OnInit } from '@angular/core';
import { ColDef, ColumnApi, GridApi, GridOptions, GridParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlService } from '../../../shared/configs/api-url.service';
import { Category } from '../../../shared/models/category';
import { CategoryGridService } from '../category-grid.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;
  gridOptions!: GridOptions;
  defaultColDef!: ColDef;


  constructor(private categoryGridService: CategoryGridService, private categoryService: CategoryService, private apiUrl: ApiUrlService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.setGridOptions();
  }

  setGridOptions(): void {
    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      filter: true,
    };
    
    this.gridOptions = {
      columnDefs: this.categoryGridService.getColumns()
    }
  }

  onGridReady(params: any): void {
    
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.categoryService.get(this.apiUrl.GET_CATEGORY).subscribe((categories: Category[]) => {
      this.gridApi.setRowData(categories)
    })
  }

}
