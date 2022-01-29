import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { NgEventBus } from 'ng-event-bus';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ToastrModule } from 'ngx-toastr';
import { ActionButtonCellRendererComponent } from './components/ag-grid/cell-renderer/action-button-cell-renderer/action-button-cell-renderer.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { KeysPipe } from './pipes/keys.pipe';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    ActionButtonCellRendererComponent,
    ConfirmModalComponent,
    KeysPipe,
    ColorPickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
    }),
    HttpClientModule,
    ToastrModule.forRoot(),
    ColorPickerModule,
  ],
  exports: [
    // Module
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LoggerModule,
    ToastrModule,
    AgGridModule,
    ColorPickerModule,

    //pipe
    KeysPipe,

    //component
    ColorPickerComponent,
  ],
  providers: [NgEventBus],
})
export class SharedModule {}
