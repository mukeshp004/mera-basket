import { Attribute2formlyService } from './../../../shrared/services/attribute2formly.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { IAttributeGroup } from './../../../shared/models/attributes/attribute-group';
import { IAttributeFamily } from './../../../shared/models/attributes/attribute-family';
import { Injectable } from '@angular/core';
import { IAttribute } from '../../../shared/models/attributes/attribute';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductFormlyService {
  constructor(private attribute2formlyService: Attribute2formlyService) {}

  formFields(attributeFamily: IAttributeFamily, excludeConfigurable = false) {
    const fields: FormlyFieldConfig[] = [];

    attributeFamily?.groups?.forEach((group: IAttributeGroup) => {
      if (group && group.name) {
        const g = this.attribute2formlyService.generateFormGroup(
          group.code || group.name,
          group.name
        );

        console.log('group.attributes', group.attributes);

        let attributes = group.attributes || [];

        if (excludeConfigurable) {
          attributes = attributes.filter((attribute) => {
            return !attribute.is_configurable;
          });
        }

        console.log('attributes', attributes);

        attributes.forEach((attribute: IAttribute) => {
          const field = this.attribute2formlyService.generateField(
            attribute
          ) as FormlyFieldConfig;
          console.log(attribute);
          if (field) {
            g.fieldGroup?.push(field);
          }
        });

        fields.push(g);
      }
    });

    return fields;
  }

  generateInventoryGroup(): FormlyFieldConfig {
    const inventoryGroup = this.attribute2formlyService.generateFormGroup(
      'inventory',
      'Inventory'
    );

    inventoryGroup.fieldGroup = [
      this.attribute2formlyService.generateField({
        code: 'Inventory',
        name: 'Inventory',
        type: 'number',
      } as IAttribute),
    ];

    return inventoryGroup;
  }

  generateConfigurableGroup(
    configurableAttributes: IAttribute[]
  ): FormlyFieldConfig {
    const configGroup = {
      key: 'variants',
      type: 'repeat-table',
      wrappers: ['configuration-panel'],
      templateOptions: {
        label: 'Configuration',
        isCollapse: false,
        additionalProperties: {
          attributes: configurableAttributes,
        },
      },
      fieldArray: {
        fieldGroup: [],
      },
    } as FormlyFieldConfig;

    return configGroup;
  }
}
