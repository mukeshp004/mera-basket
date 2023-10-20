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
import { IProduct } from 'projects/pos/src/app/shared/models/product';
import { IInventorySource } from '../../../../models/inventory-source';
import { IInventory, Inventory } from '../../../../models/inventory';

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
  product?: IProduct;
  inventorySources: IInventorySource[] = [];

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
    this.product = props.product;
    this.inventorySources = props.inventorySources;

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

      const variantProduct = this.getVariantProduct(variantValues);

      variantValues = {
        id: variantProduct ? variantProduct.id: 0,
        ...variantValues,
        // quantity: variantProduct ? variantProduct.quantity : 0,
        // inventories: variantProduct ? this.setupInventoriesModel(variantProduct) : this.getInventoriesField(),
        price: variantProduct ? variantProduct.price : 0,
        status: 1,
      };

      this.field.model?.push(variantValues);
    });
  }

  setupInventoriesModel(variantProduct: any) {
    console.log(variantProduct);
    const inventories: any = {};
    variantProduct.inventories.forEach((inventory: IInventory) => {
      inventories[`inventory-${inventory.inventory_source_id!}`] = inventory.quantity;
    })

  }

  getVariantProduct(variant: any) {
    if (this.product) {
      let productVariants = [...(this.product.variants as IProduct[])];

      // console.log('variant', variant)
      for (const attrKey in variant) {
        if (Object.prototype.hasOwnProperty.call(variant, attrKey)) {
          if (!['name', 'sku'].includes(attrKey)) {
            const attrValue = variant[attrKey];

            productVariants = productVariants?.filter((p: IProduct) => {
              return p[attrKey as keyof typeof p] === attrValue;
            });
          }
        }
      }

      if (productVariants.length > 0) {
        return productVariants[0];
      }
    }

    return null;
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
      selectedAttributeOptions: this.selectedAttributeOptions,
    });
  }

  togglePanel() {
    this.isCollapsed = !this.isCollapsed;
  }

  addFields() {
    // console.log("variatns ====>", this.variants);
    if (!this.variants || this.variants.length == 0) return;
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
        key: 'id',
        className: 'col-sm-12',
        props: {
          type: 'number',
        },
      },
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
      // {
      //   className: 'col-sm-12',
      //   type: 'input',
      //   key: 'quantity',
      //   props: {
      //     type: 'number',
      //     required: true,
      //   },
      // },
      {
        key: 'inventories',
        className: 'col-sm-12',
        wrappers: ['inventory-wrapper'],
        props: {
          type: 'number',
          required: true,
        },
        fieldGroup: this.getInventoriesField(),
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

  getInventoriesField() {
    const fieldGroup: FormlyFieldConfig[] = [];

    this.inventorySources.forEach((inventorySource) => {
      console.log('inventorySource', inventorySource);

      fieldGroup?.push(
        this.attribute2formlyService.generateField({
          code: `inventory-${inventorySource.id}`,
          name: inventorySource.name,
          type: 'number',
        } as IAttribute)
      );
    });

    return fieldGroup;
  }

  setColumns() {
    if (!this.variants || this.variants.length == 0) return;

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
