import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
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
