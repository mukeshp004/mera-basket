import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { ToastrModule } from 'ngx-toastr';
import { ActionButtonCellRendererComponent } from 'projects/common-lib/src/lib/shared/components/ag-grid/cell-renderer/action-button-cell-renderer/action-button-cell-renderer.component';
import { ConfirmModalComponent } from 'projects/common-lib/src/lib/shared/components/confirm-modal/confirm-modal.component';
import { SupplierDropdownComponent } from './components/supplier-dropdown/supplier-dropdown.component';
// import { KeysPipe } from 'projects/common-lib/src/lib/shared/pipes/keys.pipe';

@NgModule({
  declarations: [
    ActionButtonCellRendererComponent,
    ConfirmModalComponent,
    SupplierDropdownComponent,

    // Directive ------------

    // Pipes ------------
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbTypeaheadModule,
    AgGridModule.withComponents([]),
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule,
    AgGridModule,

    // Components ------------
    NgbTypeaheadModule,
    ActionButtonCellRendererComponent,
    SupplierDropdownComponent,

    // Directive ------------

    // Pipes ------------
    // KeysPipe,
  ],
})
export class SharedModule {}
