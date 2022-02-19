import { Component, OnInit } from '@angular/core';
import { FieldType, FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-panel-wrapper',
  templateUrl: './formly-panel-wrapper.component.html',
  styleUrls: ['./formly-panel-wrapper.component.scss'],
})
export class FormlyPanelWrapperComponent
  extends FieldWrapper<FormlyFieldConfig>
  implements OnInit
{
  ngOnInit(): void {}
}
