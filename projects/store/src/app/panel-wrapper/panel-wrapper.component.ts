import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

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
        type: 'text',
        label: 'Town',
      },
    });

    console.log(this.field);

    (<any>this.options)?.build();
  }
}
