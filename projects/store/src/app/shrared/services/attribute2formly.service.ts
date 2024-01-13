import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { IAttribute } from '../../shared/models/attributes/attribute';
import { FORMLY_FIELD_TYPE } from '../../shared/enums/formly-field-type.enum';

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

  generateField(attribute: IAttribute, fieldConfig?: FormlyFieldConfig): FormlyFieldConfig {
    switch (attribute.type) {
      case 'image':
        return this.generateImageField(attribute);
        break;

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
        return this.generateAmountField(attribute,  fieldConfig);
        break;

      case 'boolean':
        return this.generateCheckboxField(attribute);
        break;

      default:
        return this.generateTextField(attribute, fieldConfig);
        break;
    }
  }

  generateTextField(attribute: IAttribute, fieldConfig?: FormlyFieldConfig): FormlyFieldConfig {
    const field =  {
      key: attribute.code,
      type: 'input',
      props: {
        required: attribute.is_required || false,
        type: FORMLY_FIELD_TYPE.text,
        label: attribute.name,
      },
    } as FormlyFieldConfig;

    if(fieldConfig && fieldConfig.wrappers) {
      field.wrappers= fieldConfig.wrappers
    }

    return field;
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

  generateAmountField(attribute: IAttribute,  fieldConfig?: FormlyFieldConfig): FormlyFieldConfig {
    const field = {
      key: attribute.code,
      type: 'input',
      props: {
        required: attribute.is_required || false,
        type: FORMLY_FIELD_TYPE.number,
        label: attribute.name,
      },
    } as FormlyFieldConfig;

    
    if(fieldConfig && fieldConfig.wrappers) {
      field.wrappers= fieldConfig.wrappers
    }

    return field;
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

  generateImageField(attribute: IAttribute,  fieldConfig?: FormlyFieldConfig): FormlyFieldConfig {
    const field = {
      key: attribute.code,
      type: 'image',
      props: {
        required: attribute.is_required || false,
        label: attribute.name,
      },
    } as FormlyFieldConfig;

    
    if(fieldConfig && fieldConfig.wrappers) {
      field.wrappers= fieldConfig.wrappers
    }

    return field;
  }
}
