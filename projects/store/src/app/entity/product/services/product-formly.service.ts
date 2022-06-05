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

  formField(attributeFamily: IAttributeFamily) {
    const fields: FormlyFieldConfig[] = [];

    attributeFamily?.groups?.forEach((group: IAttributeGroup) => {
      if (group && group.name) {
        const g = this.attribute2formlyService.generateFormGroup(
          group.name,
          group.name
        );

        group.attributes?.forEach((attribute: IAttribute) => {
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
      } as IAttribute),
    ];

    return inventoryGroup;
  }
}
