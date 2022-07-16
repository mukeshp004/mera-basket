import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { jsonFormFields } from './json-from';

@Component({
  selector: 'app-json-from',
  templateUrl: './json-from.component.html',
  styleUrls: ['./json-from.component.scss'],
})
export class JsonFromComponent implements OnInit {
  formFields: FormlyFieldConfig[] = jsonFormFields;
  form: UntypedFormGroup = this.fb.group({});
  model = {};

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    console.log(this.formFields);
  }

  submit() {
    console.log('form Values', this.form.value);
  }
}
