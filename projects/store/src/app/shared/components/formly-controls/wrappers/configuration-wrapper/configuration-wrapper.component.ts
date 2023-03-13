import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { ConfigurationModalComponent } from 'projects/store/src/app/entity/product/modal/configuration-modal/configuration-modal.component';
import { ProductService } from 'projects/store/src/app/entity/product/services/product.service';
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
  selectedAttributes: any[] = [];
  configurableAttributes: any[] = [];
  selectedAttributeOptions: any = {};

  productModel: any;

  constructor(
    private modalService: NgbModal,
    private cd: ChangeDetectorRef,
    private productFormly: ProductFormlyService,
    private productService: ProductService,
    private attribute2formlyService: Attribute2formlyService,
    private messageBus: MessageBusService
  ) {
    super();
  }
  ngOnInit(): void {
    this.setUpDefaultValues();
    // this.addFields();
  }

  setUpDefaultValues() {
    const props = this.props['additionalProperties'];
    this.configurableAttributes = props.attributes;
    this.productModel = props.productModel;

    this.selectedAttributeOptions = props.selectedAttributeOptions;

    if (Object.keys(this.selectedAttributeOptions).length > 0) {
      this.setupVariableProduct(this.selectedAttributeOptions);
    }
  }

  ngAfterViewInit(): void {
    this.setUpDefaultValues();
  }

  showConfigurationModal() {
    const modalRef = this.modalService.open(
      ConfigurationModalComponent
    ) as NgbModalRef;

    modalRef.componentInstance.attributes = [
      ...this.props['additionalProperties'].attributes,
    ];

    modalRef.componentInstance.selectedAttributeOptions =
      this.selectedAttributeOptions;

    modalRef.componentInstance.change.subscribe(
      (selectedAttributeOptions: any[]) => {
        this.setupVariableProduct(selectedAttributeOptions);
      }
    );
  }

  setupModel() {
    this.variants.forEach((variant: any) => {
      console.log('================', variant);
      const variantOptions = Object.values(variant)
        .map((option: any) => option.name.toLowerCase())
        .join('-');

      let variantValues: any = {
        name: `${this.productModel.name}-${variantOptions}`,
        sku: `${this.productModel.sku}-${variantOptions}`,
      };

      for (let key in variant) {
        variantValues[key] = variant[key].id;
      }

      variantValues = {
        ...variantValues,
        quantity: 0,
        price: 0,
        status: 1,
      };

      this.field.model?.push(variantValues);
    });
  }

  setupVariableProduct(selectedAttributeOptions: any): void {
    this.field.fieldGroup = [];
    this.field.model.splice(0, this.field.model.length);

    this.selectedAttributeOptions = selectedAttributeOptions;

    this.variants = this.productService.generateConfigurableProduct(
      this.selectedAttributeOptions
    );

    /**
     * This will setup variable model value after product configuration is rendered
     */
    this.setupModel();

    this.addFields();
    this.setColumns();

    this.messageBus.publish(MessageBusConstant.productVariantsChanged, {
      variants: this.variants,
      // selectedAttributeOptions: this.selectedAttributeOptions,
    });
  }

  togglePanel() {
    this.isCollapsed = !this.isCollapsed;
  }

  addFields() {
    const selectedAttributes = Object.keys(this.variants[0]);

    const fields: FormlyFieldConfig[] = [
      ...this.configurableAttributes
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
        className: 'col-sm-12',
        props: {
          // type: 'date',
        },
      },
      {
        className: 'col-sm-12',
        type: 'input',
        key: 'sku',
        props: {
          // label: 'Name of Investment:',
          required: true,
        },
      },
      ...fields,
      {
        className: 'col-sm-12',
        type: 'input',
        key: 'quantity',
        props: {
          type: 'number',
          required: true,
        },
      },
      {
        className: 'col-sm-12',
        type: 'input',
        key: 'price',
        props: {
          type: 'number',
          required: true,
        },
      },
      {
        className: 'col-sm-12',
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

    (<any>this.options)?.build();
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
