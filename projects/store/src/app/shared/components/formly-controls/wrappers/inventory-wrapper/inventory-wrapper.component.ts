import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FieldWrapper,
  FormlyFieldConfig,
  FormlyFieldProps,
} from '@ngx-formly/core';
import { IInventorySource } from '../../../../models/inventory-source';
import { Attribute2formlyService } from 'projects/store/src/app/shrared/services/attribute2formly.service';
import { IAttribute } from 'projects/pos/src/app/shared/models/attribute';

@Component({
  selector: 'app-inventory-wrapper',
  templateUrl: './inventory-wrapper.component.html',
  styleUrls: ['./inventory-wrapper.component.scss'],
})
export class InventoryWrapperComponent
  extends FieldWrapper<FormlyFieldConfig>
  implements OnInit, AfterViewInit
{
  @ViewChild('myDrop') dropdown: any;
  quantity = 0;

  constructor() {
    super();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getQuantity();
  }

  getQuantity() {
    this.quantity = 0;
    const inventories = this.field.model;
    const quantities = inventories ? Object.values(inventories) : [];

    if (quantities.length > 0) {
      quantities.forEach((quantity: any) => {
        this.quantity += +quantity || 0;
      });
    }

    return this.quantity;
  }

  update() {
    this.dropdown.close();
  }
}
