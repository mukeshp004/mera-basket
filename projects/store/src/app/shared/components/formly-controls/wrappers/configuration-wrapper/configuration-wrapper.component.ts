import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
  FieldWrapper,
  FormlyFieldConfig,
  FormlyFormBuilder,
} from '@ngx-formly/core';
import { ConfigurationModalComponent } from 'projects/store/src/app/entity/product/modal/configuration-modal/configuration-modal.component';
import { MessageBusConstant } from '../../../../constants/message-bus.constant';
import { ProductFormlyService } from './../../../../../entity/product/services/product-formly.service';
import { Attribute2formlyService } from './../../../../../shrared/services/attribute2formly.service';
import { IAttribute } from './../../../../models/attributes/attribute';
import { MessageBusService } from './../../../../services/message-bus.service';

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
    // this.addFields();
    // this.configurableAttributes = this.props['additionalProperties'].attributes;
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
      ...this.props['additionalProperties'].attributes,
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

        // if (field.props) {
        field.props!.readonly = true;
        field.props!.label = '';
        // }

        return field;
      });

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

    this.field.fieldArray = {
      fieldGroup: fieldGroup,
    };

    this.field.fieldArray.fieldGroup?.push(...fieldGroup);

    (<any>this.options)?.build();

    // this.cd.detectChanges();
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
    this.props['columns'] = columns;
  }
}
