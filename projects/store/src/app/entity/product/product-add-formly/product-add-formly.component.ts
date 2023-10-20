import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MetaData } from 'ng-event-bus/lib/meta-data';
import { ToastrService } from 'ngx-toastr';
import { IAttribute } from 'projects/store/src/app/shared/models/attributes/attribute';
import { Observable, delay, finalize, tap } from 'rxjs';
import { IAttributeFamily } from '../../../shared/models/attributes/attribute-family';
import { IAttributeGroup } from '../../../shared/models/attributes/attribute-group';
import { IAttributeOption } from '../../../shared/models/attributes/attribute-option';
import { HelperService } from '../../../shared/services/helper.service';
import { AttributeFamilyService } from '../../attribute-family/services/attribute-family.service';
import { AttributeService } from '../../attribute/attribute.service';
import { ProductFormlyService } from '../services/product-formly.service';
import { ProductService } from '../services/product.service';
import { MessageBusConstant } from './../../../shared/constants/message-bus.constant';
import { PRODUCT_TYPE } from './../../../shared/enums/product-type.enum';
import {
  IProduct,
  IProductFindResponse,
} from './../../../shared/models/product';
import { MessageBusService } from './../../../shared/services/message-bus.service';
import { IInventorySource } from '../../../shared/models/inventory-source';
import { ProductValueService } from '../services/product-value.service';
import { Inventory } from '../../../shared/models/inventory';

@Component({
  selector: 'app-product-add-formly',
  templateUrl: './product-add-formly.component.html',
  styleUrls: ['./product-add-formly.component.scss'],
})
export class ProductAddFormlyComponent implements OnInit {
  @ViewChild('formly') formly: any;

  formFields: FormlyFieldConfig[] = [];
  configurableFormFields: FormlyFieldConfig = {};
  model: any = {};
  form: UntypedFormGroup = this.fb.group({});
  isSaving = false;

  product!: IProduct;
  variants?: IProduct[];
  productTypes = PRODUCT_TYPE;
  productTypeOptions = this.helperService.enum2Options(PRODUCT_TYPE);

  attributes: IAttribute[] = [];
  configurableAttributes: IAttribute[] = [];

  attributeFamilies: IAttributeFamily[] = [];
  selectedAttributeFamily?: IAttributeFamily;
  attributeFamilyOptions: any[] = [];

  excludeConfigurableAttribute = false;

  productDetail: IProductFindResponse | undefined = undefined;
  inventorySources: IInventorySource[] = [];

  /**
   * Selected attribute option for product
   * attribute[color] = [ op1, op2 ]
   */

  selectedAttributeOptions: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private productService: ProductService,
    private attributeService: AttributeService,
    private attributeFamilyService: AttributeFamilyService,
    private helperService: HelperService,
    private productFormly: ProductFormlyService,
    private messageBus: MessageBusService,
    private cd: ChangeDetectorRef,
    private productDefaultValueService: ProductValueService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      const data: IProductFindResponse = response.entity;
      this.attributeFamilies = data.attributeFamilies;
      this.inventorySources = data.inventorySources;

      console.log(this.inventorySources);

      if (data.product) {
        this.product = data.product;
        this.variants = this.product.variants;

        // console.log('this.variants ====> ', this.variants);
        this.selectedAttributeFamily = data.attributeFamily;
        setTimeout(() => {
          this.updateForm();
        }, 1000);
      }

      this.buildFormlyForm();
    });
  }

  productsVariantsChangeListener() {
    this.messageBus
      .listen(MessageBusConstant.productVariantsChanged)
      .subscribe((payLoad: MetaData) => {
        this.selectedAttributeOptions = payLoad.data.selectedAttributeOptions;
      });
  }

  productsVariantsChangeListener1() {
    this.messageBus
      .listen(MessageBusConstant.productVariantsChanged)
      .subscribe((payLoad: MetaData) => {
        const variants = payLoad.data.variants;

        this.model['variants'] = [];

        variants.forEach((variant: any) => {
          // console.log('================', variant);
          const variantOptions = Object.values(variant)
            .map((option: any) => option.name.toLowerCase())
            .join('-');

          let variantValues: any = {
            name: `${this.model.name}-${variantOptions}`,
            sku: `${this.model.sku}-${variantOptions}`,
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

          this.model['variants'].push(variantValues);
        });
      });
  }

  /**
   * Builds product form
   */
  buildFormlyForm() {
    this.formFields = this.intFormField();
  }

  /**
   * Initialize form
   *
   * @returns FormlyFieldConfig[]
   */
  intFormField(): FormlyFieldConfig[] {
    return [
      {
        key: 'name',
        type: 'input',
        props: {
          required: true,
          type: 'text',
          label: 'Name',
        },
        // expressionProperties: {
        //   'model.sku': (model) => model.name,
        // },
      },
      {
        key: 'sku',
        type: 'input',
        props: {
          required: true,
          type: 'text',
          label: 'SKU',
        },
      },

      {
        key: 'type',
        type: 'select',
        // defaultValue: PRODUCT_TYPE.Simple,
        props: {
          label: 'Product Type',
          options: this.productTypeOptions,
          change: this.onProductTypeChange,
        },
        expressions: {
          'templateOptions.disabled': '!model.name || !model.sku',
        },
        modelOptions: {
          debounce: {
            default: 2000,
          },
        },
      },
      {
        key: 'attribute_family_id',
        type: 'select',
        defaultValue: null,
        props: {
          label: 'Attribute Family',
          placeholder: 'Select Attribute Family',
          options: this.attributeFamilies,
          valueProp: (option: any) => option.id,
          compareWith: (o1: IAttributeFamily, o2: IAttributeFamily) => {
            return o1 && o2 && o1.id === o2.id;
          },
          labelProp: 'name',

          // change: this.onAttributeFamilyChange,
        },
        expressions: {
          'templateOptions.disabled': '!model.name || !model.sku',
        },
        hooks: {
          // onInit: (field?: FormlyFieldConfig) => {
          //   // field?.formControl?.valueChanges
          //   //   .pipe(
          //   //     tap(() => {
          //   //       this.onAttributeFamilyChange(field);
          //   //     })
          //   //   )
          //   //   .subscribe((v) => console.log(v));
          //   setTimeout(() => {
          //     console.log('attribute dropdown intialized');
          //     this.onAttributeFamilyChange(field);
          //   }, 100);
          // },
          onChanges: (field?: FormlyFieldConfig) => {
            field?.formControl?.valueChanges
              .pipe(
                // distinctUntilChanged(),
                delay(10),
                tap(() => {
                  this.onAttributeFamilyChange(field);
                })
              )
              .subscribe();
          },
        },
      },
    ];
  }

  /**
   * This method is called when product type is changed
   *
   * @param field FormlyFieldConfig
   * @param $event
   */
  onProductTypeChange = (field: FormlyFieldConfig, $event?: any) => {
    this.model['type'] = field.formControl?.value;

    this.excludeConfigurableAttribute = false;
    if (this.model['type'] === PRODUCT_TYPE.Configurable) {
      this.excludeConfigurableAttribute = true;
    }

    if (this.model['attribute_family_id']) {
      // this.appendForm();
    }
  };

  // onAttributeFamilyChange = (formField: any, $event: any) => {
  onAttributeFamilyChange = (formField: any) => {
    const value = this.model['attribute_family_id'];

    if (!value) return;

    this.selectedAttributeFamily = this.attributeFamilies.find(
      (attributeFamily: IAttributeFamily) => {
        return attributeFamily.id === value;
      }
    );

    this.getConfigurableAttributes();

    this.appendForm();
  };

  /**
   * This method get the configurable attribute and set in this.configurableAttributes;
   */
  getConfigurableAttributes() {
    this.configurableAttributes = [];

    this.selectedAttributeFamily?.groups?.forEach((group: any) => {
      group.attributes.forEach((attribute: IAttribute) => {
        if (attribute.is_configurable) {
          this.configurableAttributes.push(attribute);
        }
      });
    });

    // this.setColor();
    this.setConfigurableAttribute();
  }

  setConfigurableAttributeWithoutConfig() {
    if (!this.product || !this.product['super_attributes']) return;

    const supper_attributes = this.product['super_attributes'];

    const supper_attribute_code: string[] = this.product[
      'super_attributes'
    ].map((attribute: IAttribute) => attribute.code);

    // console.log('super_attributes code =====>', supper_attribute_code);

    /**
     * get selected attribute and groups
     */
    const groups: { [key: string]: IAttributeGroup } = {};

    this.selectedAttributeFamily?.groups?.forEach((group) => {
      group.attributes?.forEach((attribute) => {
        if (attribute.code && supper_attribute_code.includes(attribute.code!)) {
          groups[attribute.code] = group;
        }
      });
    });

    // console.log('attribute Groups with select attribute  ==> ', groups);

    /**
     * to get selected options from variable prouct using groups and attributes
     */
    const options: { [key: string]: any } = {};

    for (let attributeCode in groups) {
      const group = groups[attributeCode];
      this.variants?.forEach((variant) => {
        const value = variant[group.code!][attributeCode];
        if (!options[attributeCode]) {
          options[attributeCode] = [];
        }

        if (value && !options[attributeCode].includes(value)) {
          options[attributeCode].push(value);
        }
      });
    }

    // console.log('options  ==> ', options);

    supper_attribute_code.forEach((attrCode: string) => {
      const attr = this.configurableAttributes.find((attribute: IAttribute) => {
        return attribute.code === attrCode;
      });

      this.selectedAttributeOptions[attrCode] = attr?.options?.filter(
        (option: any) => {
          return options[attrCode].includes(option.id);
        }
      );
    });
  }

  setConfigurableAttribute() {
    if (!this.product || !this.product['super_attributes']) return;
    const superAttributes: { [key: number]: any[] } =
      this.product['super_attributes'];

    const selectedaAttIds: any[] = Object.keys(
      this.product['super_attributes']
    ).map((e) => +e);

    const selectedAttributes = this.configurableAttributes.filter(
      (attribute: IAttribute) => {
        return selectedaAttIds.includes(attribute.id);
      }
    );

    selectedAttributes.forEach((attribute: IAttribute) => {
      const filterOptions = superAttributes[attribute.id!];

      const selectedOptions = attribute.options?.filter(
        (option: IAttributeOption) => {
          const selectedOptions = superAttributes[attribute.id!];
          return filterOptions.includes(option.id);
        }
      );

      return (this.selectedAttributeOptions[attribute.code!] = selectedOptions);
    });
  }

  // setColor() {
  //   const colorAttr = this.configurableAttributes.find(
  //     (attribute: IAttribute) => {
  //       return attribute.code === 'color';
  //     }
  //   );

  //   this.selectedAttributeOptions['color'] = colorAttr?.options?.filter(
  //     (option) => {
  //       return option.id === 2 || option.id === 3;
  //     }
  //   );

  //   console.log(this.selectedAttributeOptions);
  // }

  appendForm() {
    // console.log('append form called');
    let fields: FormlyFieldConfig[] = [];

    fields = [...this.intFormField()];

    if (this.selectedAttributeFamily) {
      // Set configurable product
      // set configurable wrapper
      if (this.model['type'] === PRODUCT_TYPE.Configurable) {
        this.configurableFormFields =
          this.productFormly.generateConfigurableGroup(
            this.configurableAttributes,
            this.selectedAttributeOptions,
            this.model,
            this.product,
            this.inventorySources
          );

        fields.push(this.configurableFormFields);
      }

      const configurableFields = this.productFormly.formFields(
        this.selectedAttributeFamily,
        this.excludeConfigurableAttribute
      );

      fields.push(...configurableFields);

      if (this.model['type'] !== PRODUCT_TYPE.Configurable) {
        fields.push(
          this.productFormly.generateInventoryGroup(this.inventorySources)
        );
      }

      setTimeout(() => {
        this.formFields = [...fields];
      });
    }
  }

  goBack() {
    this.router.navigate(['product']);
  }

  transformSelectedAttributeOption() {
    let selectedAttributeOptions = {};
    if (this.selectedAttributeOptions) {
      const selectedOptions = [].concat(
        ...(Object.values(this.selectedAttributeOptions) as any[])
      );

      selectedAttributeOptions = selectedOptions.reduce(
        (result, current: IAttributeOption, index) => {
          result[current.attribute_id!] = result[current.attribute_id!] || [];
          result[current.attribute_id!].push(current.id);
          return result;
        },
        {} as { [key: number]: any[] }
      );
    }

    return selectedAttributeOptions;
  }

  submit() {
    // this.isSaving = true;
    const params = this.model;
    console.log(this.model);

    if (this.selectedAttributeOptions) {
      params['super_attributes'] = this.transformSelectedAttributeOption();
    }

    if (params?.id) {
      this.subscribeToSaveResponse(this.productService.put(params.id, params));
    } else {
      this.subscribeToSaveResponse(this.productService.post(params));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IProduct>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: (error) => this.onSaveError,
    });
  }

  protected onSaveSuccess(): void {
    const createdMsg = 'Product created Successfully';
    const updatedMsg = 'Product updated Successfully';

    this.toastr.success(this.product?.id ? updatedMsg : createdMsg, 'Success');
    // this.router.navigate(['/product']);
  }

  protected onSaveError(error: any): void {
    // Api for inheritance.
    this.toastr.error(error.message);
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  updateForm() {
    this.model = { ...this.product };

    this.model['meta_description'] = this.product['meta_description'];

    if (this.product.variants) {
      this.model['variants'] = this.product.variants.map((variant) => {
        // variant['price'] = variant.price;
        return variant;
      });
    }

    this.updateInventoryInModel();
  }

  updateInventoryInModel() {
    if (this.model['type'] !== PRODUCT_TYPE.Configurable) {
      this.model['inventories'] = {};
      this.product.inventories?.forEach((inventory: Inventory) => {
        this.model.inventories[`inventory-${inventory.inventory_source_id!}`] =
          inventory.quantity;
      });
    }
  }

  addDefaultValues() {
    const model1 =
      this.productDefaultValueService.getSimpleProductDefaultValue();
    this.model = { ...this.model, ...model1 };
  }

  addConfigProductDefaultValues() {
    const model1 =
      this.productDefaultValueService.getConfigurableProductDefaultValue();
    this.model = { ...this.model, ...model1 };
  }
}
