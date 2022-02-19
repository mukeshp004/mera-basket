import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { AgGridModule } from 'ag-grid-angular';
import { NgEventBus } from 'ng-event-bus';
import { ColorPickerModule } from 'ngx-color-picker';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ToastrModule } from 'ngx-toastr';
import { ActionButtonCellRendererComponent } from './components/ag-grid/cell-renderer/action-button-cell-renderer/action-button-cell-renderer.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { FormlyFieldInputComponent } from './components/formly-controls/formly-field-input/formly-field-input.component';
import { FormlyFieldSelectComponent } from './components/formly-controls/formly-field-select/formly-field-select.component';
import { FormlyFieldToggleComponent } from './components/formly-controls/formly-field-toggle/formly-field-toggle.component';
import { FormlyFieldHorizontalWrapperComponent } from './components/formly-controls/wrappers/formly-field-horizontal-wrapper/formly-field-horizontal-wrapper.component';
import { FormlyPanelWrapperComponent } from './components/formly-controls/wrappers/formly-panel-wrapper/formly-panel-wrapper.component';
import { FormlyWrapperFormFieldComponent } from './components/formly-controls/wrappers/formly-wrapper-form-field/formly-wrapper-form-field.component';
import { KeysPipe } from './pipes/keys.pipe';

@NgModule({
  declarations: [
    ActionButtonCellRendererComponent,
    ConfirmModalComponent,
    KeysPipe,
    ColorPickerComponent,
    FormlyFieldInputComponent,
    FormlyFieldSelectComponent,
    FormlyFieldToggleComponent,
    FormlyWrapperFormFieldComponent,
    FormlyFieldHorizontalWrapperComponent,
    FormlyPanelWrapperComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        {
          name: 'input',
          component: FormlyFieldInputComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'select',
          component: FormlyFieldSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'boolean',
          component: FormlyFieldToggleComponent,
          wrappers: ['form-field'],
        },
      ],
      wrappers: [
        {
          name: 'form-field',
          component: FormlyFieldHorizontalWrapperComponent,
        },
        { name: 'panel', component: FormlyPanelWrapperComponent },
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
    // DynamicFormModule.forRoot({
    //   types: [
    //     {
    //       name: 'input',
    //       component: FormlyFieldInputComponent,
    //       wrappers: ['form-field'],
    //     },
    //     {
    //       name: 'select',
    //       component: FormlyFieldSelectComponent,
    //       wrappers: ['form-field'],
    //     },
    //     {
    //       name: 'boolean',
    //       component: FormlyFieldToggleComponent,
    //       wrappers: ['form-field'],
    //     },
    //   ],
    //   wrappers: [
    //     {
    //       name: 'form-field',
    //       component: FormlyFieldHorizontalWrapperComponent,
    //     },
    //     { name: 'panel', component: FormlyPanelWrapperComponent },
    //   ],
    //   validationMessages: [
    //     { name: 'required', message: 'This field is required' },
    //   ],
    // }),
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
    FormlyModule,
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
