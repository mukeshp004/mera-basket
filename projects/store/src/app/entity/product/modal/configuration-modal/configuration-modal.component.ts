import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IAttribute } from './../../../../shared/models/attributes/attribute';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { forEach } from 'lodash';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-configuration-modal',
  templateUrl: './configuration-modal.component.html',
  styleUrls: ['./configuration-modal.component.scss'],
})
export class ConfigurationModalComponent implements OnInit {
  attributes: IAttribute[] = [];
  change: EventEmitter<any> = new EventEmitter();
  selectedAttributeOptions: any = {};

  configurableProduct: any[] = [];

  constructor(
    public modal: NgbActiveModal,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.attributes.forEach((attribute) => {
      this.selectedAttributeOptions[`${attribute.code}`] = [];
    });
  }

  getKey(item: any): string[] {
    const keys = Object.keys(item);
    return keys;
  }

  generateConfigurablePRoduct(): void {
    this.configurableProduct = this.productService.generateConfigurableProduct(
      this.selectedAttributeOptions
    );
  }

  save(): void {
    this.change.emit(
      this.productService.generateConfigurableProduct(
        this.selectedAttributeOptions
      )
    );
    this.modal.close();
  }
}
