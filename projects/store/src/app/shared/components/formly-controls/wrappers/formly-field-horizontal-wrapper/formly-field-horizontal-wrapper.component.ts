import { Component, OnInit } from '@angular/core';
import { FieldType, FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-horizontal-wrapper',
  templateUrl: './formly-field-horizontal-wrapper.component.html',
  styleUrls: ['./formly-field-horizontal-wrapper.component.scss'],
})
export class FormlyFieldHorizontalWrapperComponent
  extends FieldWrapper<FormlyFieldConfig>
  implements OnInit
{
  ngOnInit(): void {}
}
