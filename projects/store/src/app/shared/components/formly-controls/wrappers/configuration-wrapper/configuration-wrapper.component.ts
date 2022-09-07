import { Attribute2formlyService } from './../../../../../shrared/services/attribute2formly.service';
import { ProductFormlyService } from './../../../../../entity/product/services/product-formly.service';
import { ColDef } from 'ag-grid-community';
import { MessageBusService } from './../../../../services/message-bus.service';
import { first, forEach } from 'lodash';
import { UntypedFormBuilder } from '@angular/forms';
import {
  Attribute,
  IAttribute,
} from './../../../../models/attributes/attribute';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  NgModuleRef,
  OnInit,
} from '@angular/core';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { ConfigurationModalComponent } from 'projects/store/src/app/entity/product/modal/configuration-modal/configuration-modal.component';
import { MessageBusConstant } from '../../../../constants/message-bus.constant';

@Component({
  selector: 'app-configuration-wrapper',
  templateUrl: './configuration-wrapper.component.html',
  styleUrls: ['./configuration-wrapper.component.scss'],
})
export class ConfigurationWrapperComponent
  extends FieldWrapper<FormlyFieldConfig>
  implements OnInit, AfterViewInit
{
  isCollapsed = false;
  variants: any[] = [];
  configurableAttributes: any[] = [];

  constructor(
    private modalService: NgbModal,
    private cd: ChangeDetectorRef,
    private productFormly: ProductFormlyService,

    private attribute2formlyService: Attribute2formlyService,
    private messageBus: MessageBusService
  ) {
    super();
  }
  ngOnInit(): void {
    console.log('this', this);
    // this.addFields();
  }

  ngAfterViewInit(): void {
    // this.addFields();
    this.configurableAttributes = this.to['additionalProperties'].attributes;
  }

  showConfigurationModal() {
    const modalRef = this.modalService.open(
      ConfigurationModalComponent
    ) as NgbModalRef;
    modalRef.componentInstance.attributes = [
      ...this.to['additionalProperties'].attributes,
    ];

    modalRef.componentInstance.change.subscribe((variants: any[]) => {
      this.variants = variants;

      this.messageBus.publish(
        MessageBusConstant.productVariantsChanged,
        variants
      );

      this.setColumns();
      this.addFields();

      // this.model['variants'] = [];

      // variants.forEach((variant: any) => {
      //   // this.model['variants'].push({
      //   //   name: 'demo',
      //   // });
      // });
    });
  }

  togglePanel() {
    this.isCollapsed = !this.isCollapsed;
  }

  addFields() {
    const selectedAttributes = Object.keys(this.variants[0]);

    const fields: FormlyFieldConfig[] = this.configurableAttributes
      .filter((attribute: IAttribute) => {
        return selectedAttributes.includes(attribute.code as string);
      })
      .map((f: any) => {
        let field = this.attribute2formlyService.generateField(f);

        // if (field.templateOptions) {
        field.templateOptions!.readonly = true;
        field.templateOptions!.label = '';
        // }

        return field;
      });

    const fieldGroup = [
      {
        type: 'input',
        key: 'name',
        className: 'col-sm-4',
        templateOptions: {
          // type: 'date',
        },
      },
      {
        className: 'col-sm-4',
        type: 'input',
        key: 'sku',
        templateOptions: {
          // label: 'Name of Investment:',
          required: true,
        },
      },
      ...fields,
      {
        className: 'col-sm-4',
        type: 'input',
        key: 'quantity',
        templateOptions: {
          type: 'number',
          required: true,
        },
      },
      {
        className: 'col-sm-4',
        type: 'input',
        key: 'price',
        templateOptions: {
          type: 'number',
          required: true,
        },
      },
      {
        className: 'col-sm-4',
        type: 'select',
        key: 'status',
        templateOptions: {
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

    this.field.fieldArray = {
      fieldGroup: fieldGroup,
    };

    (<any>this.options)._buildForm();

    this.cd.detectChanges();
  }

  setColumns() {
    const columns = [
      'Name',
      'SKU',
      ...Object.keys(this.variants[0]),
      'Qty',
      'Price',
      'Status',
    ];
    this.to['columns'] = columns;
  }
}
