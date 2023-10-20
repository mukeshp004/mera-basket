import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  quantity = 0;

  constructor() {
    super();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
   
  }

  getQuantity() {
    this.quantity = 0
    const inventories = this.field.model
    if (inventories && inventories.length > 0) {
      for (const qty of inventories) {
        
        this.quantity += qty || 0
      }
      
    }
    
    return this.quantity;
  }

  update() {
    // console.log(this.getQuantity());
  }
}
