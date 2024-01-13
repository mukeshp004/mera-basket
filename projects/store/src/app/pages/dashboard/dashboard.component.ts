import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FORMLY_FIELD_TYPE } from '../../shared/enums/formly-field-type.enum';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../shared/services/helper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient, private helperService: HelperService) {}

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'firstName',
      type: 'input',
      defaultValue: 'test',
      props: {
        required: true,
        type: FORMLY_FIELD_TYPE.text,
        label: 'First Name',
      },
    },
    {
      key: 'image',
      type: 'image',
      props: {
        label: 'file upload',
      },
    },
  ];

  ngOnInit(): void {}

  submit() {
    if (this.form.valid) {
      const formData = this.model;
      // const formData = this.helperService.toFormData(this.model);
      this.http
        .post('http://localhost:8000/api/file/1?_method=put', formData, {
          headers: {
            'Content-Type': 'multipart/form-data; charset=utf-8',
          },
        })
        .subscribe({
          next: (data) => {
            console.log(data);
          },
        });
      }
  }
}
