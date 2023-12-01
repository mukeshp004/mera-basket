import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { FORMLY_FIELD_TYPE } from '../shared/enums/formly-field-type.enum';

@Component({
  selector: 'app-panel-wrapper',
  templateUrl: './panel-wrapper.component.html',
  styleUrls: ['./panel-wrapper.component.scss'],
})
export class PanelWrapperComponent extends FieldWrapper {
  add() {
    console.log(this.field);
    this.field.fieldGroup?.push({
      key: 'name',
      type: 'input',
      props: {
        required: true,
        type: FORMLY_FIELD_TYPE.text,
        label: 'Town',
      },
    });

    console.log(this.field);

    (<any>this.options)?.build();
  }
}
