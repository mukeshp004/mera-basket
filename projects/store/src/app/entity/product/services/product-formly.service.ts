import { Attribute2formlyService } from './../../../shrared/services/attribute2formly.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { IAttributeGroup } from './../../../shared/models/attributes/attribute-group';
import { IAttributeFamily } from './../../../shared/models/attributes/attribute-family';
import { Injectable } from '@angular/core';
import { IAttribute } from '../../../shared/models/attributes/attribute';
import { retry } from 'rxjs';
import { IProduct } from '../../../shared/models/product';
import { IInventorySource } from '../../../shared/models/inventory-source';

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
          // group.code || group.name,
          null,
          group.name
        );

        // console.log('group.attributes', group.attributes);

        let attributes = group.attributes || [];

        if (excludeConfigurable) {
          attributes = attributes.filter((attribute) => {
            return !attribute.is_configurable;
          });
        }

        // console.log('attributes', attributes);

        attributes.forEach((attribute: IAttribute) => {
          const field = this.attribute2formlyService.generateField(
            attribute
          ) as FormlyFieldConfig;
          // console.log(attribute);
          if (field) {
            g.fieldGroup?.push(field);
          }
        });

        fields.push(g);
      }
    });

    return fields;
  }

  generateInventoryGroup(inventorySources: IInventorySource[]): FormlyFieldConfig {
    const inventoryGroup = this.attribute2formlyService.generateFormGroup(
      'inventories',
      'Inventory'
    );



    inventoryGroup.fieldGroup = [];

    inventorySources.forEach((inventorySource) => {


      inventoryGroup.fieldGroup?.push(
      this.attribute2formlyService.generateField({
        // code: `inventory-${inventorySource.id}`,
        code: `inventory-${inventorySource.id}`,
        name: inventorySource.name,
        type: 'number',
      } as IAttribute))
    
    })

    return inventoryGroup;
  }

  generateConfigurableGroup(
    configurableAttributes: IAttribute[],
    selectedAttributeOptions: any,
    productModel: any,
    product: IProduct,
    inventorySources: IInventorySource[]
  ): FormlyFieldConfig {
    const configGroup = {
      key: 'variants',
      type: 'repeat-table',
      wrappers: ['configuration-panel'],
      defaultValue: [],
      props: {
        label: 'Configuration',
        isCollapse: false,
        additionalProperties: {
          attributes: configurableAttributes,
          selectedAttributeOptions: selectedAttributeOptions,
          productModel: productModel,
          product: product,
          inventorySources: inventorySources
        },
      },
      fieldArray: {
        fieldGroup: [],
      },
    } as FormlyFieldConfig;

    return configGroup;
  }

  generateVariantionFieldGroup(
    variants: any[],
    configurableAttributes: IAttribute[]
  ) {
    if (variants.length === 0) [];

    const selectedAttributes = Object.keys(variants[0]);
    const fields: FormlyFieldConfig[] = [
      ...configurableAttributes
        .filter((attribute: IAttribute) => {
          return selectedAttributes.includes(attribute.code as string);
        })
        .map((f: any) => {
          let field = this.attribute2formlyService.generateField(f);

          // if (field.props) {
          field.props!.readonly = true;
          field.props!.label = '';
          // }

          return field;
        }),
    ];

    const fieldGroup = [
      {
        type: 'input',
        key: 'name',
        className: 'col-sm-4',
        props: {
          // type: 'date',
        },
      },
      {
        className: 'col-sm-4',
        type: 'input',
        key: 'sku',
        props: {
          // label: 'Name of Investment:',
          required: true,
        },
      },
      ...fields,
      {
        className: 'col-sm-4',
        type: 'input',
        key: 'quantity',
        props: {
          type: 'number',
          required: true,
        },
      },
      {
        className: 'col-sm-4',
        type: 'input',
        key: 'price',
        props: {
          type: 'number',
          required: true,
        },
      },
      {
        className: 'col-sm-4',
        type: 'select',
        key: 'status',
        props: {
          required: true,
          options: [
            { id: 0, name: 'InActive' },
            { id: 1, name: 'Active' },
          ],
          valueProp: 'id',
          labelProp: 'name',
        },
      },
    ];

    return fieldGroup;
  }
}
