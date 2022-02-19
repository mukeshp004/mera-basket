import { Component, OnInit } from '@angular/core';
import { FieldType, FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-wrapper-form-field',
  templateUrl: './formly-wrapper-form-field.component.html',
  styleUrls: ['./formly-wrapper-form-field.component.scss'],
})
export class FormlyWrapperFormFieldComponent
  extends FieldWrapper
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
