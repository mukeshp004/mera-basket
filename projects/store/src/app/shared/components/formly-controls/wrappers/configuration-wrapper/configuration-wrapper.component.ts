import { MessageBusService } from './../../../../services/message-bus.service';
import { forEach } from 'lodash';
import { UntypedFormBuilder } from '@angular/forms';
import { Attribute } from './../../../../models/attributes/attribute';
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

  constructor(
    private modalService: NgbModal,
    private cd: ChangeDetectorRef,
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
  }

  showConfigurationModal() {
    const modalRef = this.modalService.open(
      ConfigurationModalComponent
    ) as NgbModalRef;
    modalRef.componentInstance.attributes = [
      ...this.to['additionalProperties'].attributes,
    ];

    modalRef.componentInstance.change.subscribe((variants: any[]) => {
      console.log(variants);

      this.messageBus.publish(
        MessageBusConstant.productVariantsChanged,
        variants
      );

      this.setColumns();
      this.addFields();

      // this.model['variants'] = [];

      variants.forEach((variant: any) => {
        // this.model['variants'].push({
        //   name: 'demo',
        // });
      });
    });
  }

  togglePanel() {
    this.isCollapsed = !this.isCollapsed;
  }

  addFields() {
    this.field.fieldArray = {
      fieldGroup: [
        // {
        //   key: 'variants',
        //   type: 'repeat-table',
        //   templateOptions: {
        //     addText: 'Product Variations',
        //     columns: ['Name', 'SKU', 'Qty', 'Price', 'Status'],
        //   },
        //   fieldArray: {
        // fieldGroup: [
        {
          type: 'input',
          key: 'name',
          className: 'col-sm-4',
          templateOptions: {
            // type: 'date',
            // label: 'Date of Investment:',
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
          type: 'input',
          key: 'status',
          templateOptions: {
            required: true,
          },
        },
        // ],
        //   },
        // },
      ],
    };

    (<any>this.options)._buildForm();

    this.cd.detectChanges();
  }

  setColumns() {
    const columns = ['Name', 'SKU', 'Qty', 'Price', 'Status'];
    this.to['columns'] = columns;
  }
}
