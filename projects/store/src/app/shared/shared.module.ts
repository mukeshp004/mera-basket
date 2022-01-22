import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ToastrModule } from 'ngx-toastr';
import { ActionButtonCellRendererComponent } from './components/ag-grid/cell-renderer/action-button-cell-renderer/action-button-cell-renderer.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    ActionButtonCellRendererComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
    }),
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  exports: [CommonModule, 
    FormsModule,
    ReactiveFormsModule, 
    RouterModule, 
    LoggerModule,
    ToastrModule
  ],
  providers: [NgEventBus],
})
export class SharedModule {}
