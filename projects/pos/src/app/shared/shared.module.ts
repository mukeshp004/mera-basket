import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
import { ActionButtonCellRendererComponent } from 'projects/common-lib/src/lib/shared/components/ag-grid/cell-renderer/action-button-cell-renderer/action-button-cell-renderer.component';
import { ConfirmModalComponent } from 'projects/common-lib/src/lib/shared/components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [ActionButtonCellRendererComponent, ConfirmModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AgGridModule.withComponents([]),
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule,
    AgGridModule,

    // Components
    ActionButtonCellRendererComponent,
  ],
})
export class SharedModule {}