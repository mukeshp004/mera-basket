import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

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
        type: 'text',
        label: 'First Name',
      },
    },
    {
      key: 'address',
      wrappers: ['dpanel'],
      props: { label: 'Address' },
      fieldGroup: [
        {
          key: 'town',
          type: 'input',
          props: {
            required: true,
            type: 'text',
            label: 'Town',
          },
        },
      ],
    },
  ];

  ngOnInit(): void {}

  submit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }
}
