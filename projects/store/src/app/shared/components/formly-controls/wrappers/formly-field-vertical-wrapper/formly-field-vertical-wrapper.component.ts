import { Component, OnInit } from '@angular/core';
import { FieldType, FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-vertical-wrapper',
  templateUrl: './formly-field-vertical-wrapper.component.html',
  styleUrls: ['./formly-field-vertical-wrapper.component.scss'],
})
export class FormlyFieldVerticalWrapperComponent
  extends FieldWrapper<FormlyFieldConfig>
  implements OnInit
{
  ngOnInit(): void {}
}
