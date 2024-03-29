import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { AgGridModule } from 'ag-grid-angular';
import { NgEventBus } from 'ng-event-bus';
import { ColorPickerModule } from 'ngx-color-picker';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ToastrModule } from 'ngx-toastr';
import { ActionButtonCellRendererComponent } from './components/ag-grid/cell-renderer/action-button-cell-renderer/action-button-cell-renderer.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { FormlyCategoryDropdownComponent } from './components/formly-controls/formly-category-dropdown/formly-category-dropdown.component';
import { FormlyFieldInputComponent } from './components/formly-controls/formly-field-input/formly-field-input.component';
import { FormlyFieldSelectComponent } from './components/formly-controls/formly-field-select/formly-field-select.component';
import { FormlyFieldToggleComponent } from './components/formly-controls/formly-field-toggle/formly-field-toggle.component';
import { ConfigurationWrapperComponent } from './components/formly-controls/wrappers/configuration-wrapper/configuration-wrapper.component';
import { FormlyFieldHorizontalWrapperComponent } from './components/formly-controls/wrappers/formly-field-horizontal-wrapper/formly-field-horizontal-wrapper.component';
import { FormlyPanelWrapperComponent } from './components/formly-controls/wrappers/formly-panel-wrapper/formly-panel-wrapper.component';
import { FormlyWrapperFormFieldComponent } from './components/formly-controls/wrappers/formly-wrapper-form-field/formly-wrapper-form-field.component';
import { RepeaterTypeComponent } from './components/formly-controls/wrappers/repeater-type/repeater-type.component';
import { JsonFormatterDirective } from './directives/json-formatter.directive';
import { KeysPipe } from './pipes/keys.pipe';
import { CheckListComponent } from './components/check-list/check-list.component';
import { RepeatTableTypeComponent } from './components/formly-controls/wrappers/repeat-table-type/repeat-table-type.component';
import { PanelWrapperComponent } from '../panel-wrapper/panel-wrapper.component';
import { TranslateModule } from '@ngx-translate/core/public_api';

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
    JsonFormatterDirective,
    FormlyCategoryDropdownComponent,
    ConfigurationWrapperComponent,
    RepeaterTypeComponent,
    CheckListComponent,
    RepeatTableTypeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      types: [
        // { name: 'select', component: FormlyFieldSelectComponent },
        { name: 'repeat', component: RepeaterTypeComponent },
        { name: 'repeat-table', component: RepeatTableTypeComponent },
      ],
      wrappers: [
        {
          name: 'form-field',
          component: FormlyFieldHorizontalWrapperComponent,
        },
        { name: 'panel', component: FormlyPanelWrapperComponent },
        { name: 'dpanel', component: PanelWrapperComponent },
        {
          name: 'configuration-panel',
          component: ConfigurationWrapperComponent,
        },
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),

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

    //translate module

    //pipe
    KeysPipe,

    //component
    ColorPickerComponent,
    CheckListComponent,

    // directives
    JsonFormatterDirective,
  ],
  providers: [NgEventBus],
})
export class SharedModule {}
