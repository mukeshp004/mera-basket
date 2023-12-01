import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FORMLY_FIELD_TYPE } from '../../shared/enums/formly-field-type.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'firstName',
      type: 'input',
      props: {
        required: true,
        type: FORMLY_FIELD_TYPE.text,
        label: 'First Name',
      },
    },
  ];

  ngOnInit(): void {}

  submit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }
}
