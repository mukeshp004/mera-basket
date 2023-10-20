import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { IAttribute } from '../../shared/models/attributes/attribute';

@Injectable({
  providedIn: 'root',
})
export class Attribute2formlyService {
  constructor() {}

  generateFormGroup(key: string| null, label: string): FormlyFieldConfig {
    const formlyFieldConfig = {
      // key: key,
      wrappers: ['panel'],
      props: { label: label, isCollapse: false },
      fieldGroup: [],
    } as FormlyFieldConfig;

    if (key) {
      formlyFieldConfig['key'] = key;
    }

    return formlyFieldConfig;
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

      case 'number':
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
      props: {
        required: attribute.is_required || false,
        type: 'text',
        label: attribute.name,
      },
    } as FormlyFieldConfig;
  }

  generateSelectField(attribute: IAttribute): FormlyFieldConfig {
    return {
      key: attribute.code,
      type: 'select',
      props: {
        label: attribute.name,
        placeholder: 'Select options',
        required: attribute.is_required || false,
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
      props: {
        required: attribute.is_required || false,
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
      props: {
        required: attribute.is_required || false,
        type: 'date',
        label: attribute.name,
      },
    } as FormlyFieldConfig;
  }

  generateCheckboxField(attribute: IAttribute): FormlyFieldConfig {
    return {
      key: attribute.code,
      type: 'checkbox',
      props: {
        label: attribute.name,
        required: attribute.is_required || false,
      },
    } as FormlyFieldConfig;
  }

  generateTextAreaField(attribute: IAttribute): FormlyFieldConfig {
    return {
      key: attribute.code,
      type: 'textarea',
      props: {
        label: attribute.name,
        required: attribute.is_required || false,
        placeholder: 'This has 10 rows',
        // rows: 10,
      },
    } as FormlyFieldConfig;
  }
}
