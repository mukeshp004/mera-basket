import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { IAttribute } from '../../shared/models/attributes/attribute';

@Injectable({
  providedIn: 'root',
})
export class Attribute2formlyService {
  constructor() {}

  generateFormGroup(key: string, label: string): FormlyFieldConfig {
    return {
      key: key,
      wrappers: ['panel'],
      templateOptions: { label: label, isCollapse: false },
      fieldGroup: [],
    } as FormlyFieldConfig;
  }

  generateField(attribute: IAttribute): FormlyFieldConfig {
    switch (attribute.type) {
      case 'select':
        return this.generateSelectField(attribute);
        break;

      case 'textarea':
        return this.generateTextAreaField(attribute);
        break;

      case 'date':
        return this.generateDateField(attribute);
        break;

      case 'price':
        return this.generateAmountField(attribute);
        break;

      case 'boolean':
        return this.generateCheckboxField(attribute);
        break;

      default:
        return this.generateTextField(attribute);
        break;
    }
  }

  generateTextField(attribute: IAttribute): FormlyFieldConfig {
    return {
      key: attribute.code,
      type: 'input',
      templateOptions: {
        required: attribute.is_required,
        type: 'text',
        label: attribute.name,
      },
    } as FormlyFieldConfig;
  }

  generateSelectField(attribute: IAttribute): FormlyFieldConfig {
    return {
      key: attribute.code,
      type: 'select',
      templateOptions: {
        label: attribute.name,
        required: attribute.is_required,
        options: attribute.options,
        valueProp: 'id',
        labelProp: 'name',
      },
    } as FormlyFieldConfig;
  }

  generateAmountField(attribute: IAttribute): FormlyFieldConfig {
    return {
      key: attribute.code,
      type: 'input',
      templateOptions: {
        required: attribute.is_required,
        type: 'number',
        label: attribute.name,
      },
    } as FormlyFieldConfig;
  }

  /**
   * This method will generate formly date field config from given attribute detail
   * @param attribute IAttribute
   *
   * @returns FormlyFieldConfig of type date
   */
  generateDateField(attribute: IAttribute): FormlyFieldConfig {
    return {
      key: attribute.code,
      type: 'input',
      templateOptions: {
        required: attribute.is_required,
        type: 'date',
        label: attribute.name,
      },
    } as FormlyFieldConfig;
  }

  generateCheckboxField(attribute: IAttribute): FormlyFieldConfig {
    return {
      key: attribute.code,
      type: 'checkbox',
      templateOptions: {
        label: attribute.name,
        required: attribute.is_required,
      },
    } as FormlyFieldConfig;
  }

  generateTextAreaField(attribute: IAttribute): FormlyFieldConfig {
    return {
      key: attribute.code,
      type: 'textarea',
      templateOptions: {
        label: attribute.name,
        required: attribute.is_required,
        placeholder: 'This has 10 rows',
        // rows: 10,
      },
    } as FormlyFieldConfig;
  }
}
