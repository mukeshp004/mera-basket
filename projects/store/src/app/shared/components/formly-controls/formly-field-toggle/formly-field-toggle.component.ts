import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-toggle',
  templateUrl: './formly-field-toggle.component.html',
  styleUrls: ['./formly-field-toggle.component.scss'],
})
export class FormlyFieldToggleComponent extends FieldType<FieldTypeConfig> {}
