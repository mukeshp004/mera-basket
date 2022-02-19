import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-select',
  templateUrl: './formly-field-select.component.html',
  styleUrls: ['./formly-field-select.component.scss'],
})
export class FormlyFieldSelectComponent
  extends FieldType<FieldTypeConfig>
  implements OnInit
{
  items: any;
  // constructor(private ngZone: NgZone) {
  //   super();
  // }

  ngOnInit(): void {
    this.items = this.field.templateOptions?.options || [];
  }
}
