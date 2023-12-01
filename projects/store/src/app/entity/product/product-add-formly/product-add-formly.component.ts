import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MetaData } from 'ng-event-bus/lib/meta-data';
import { ToastrService } from 'ngx-toastr';
import { IAttribute } from 'projects/store/src/app/shared/models/attributes/attribute';
import { Observable, delay, finalize, tap } from 'rxjs';
import { FORMLY_FIELD_TYPE } from '../../../shared/enums/formly-field-type.enum';
import { IAttributeFamily } from '../../../shared/models/attributes/attribute-family';
import { IAttributeOption } from '../../../shared/models/attributes/attribute-option';
import { Inventory } from '../../../shared/models/inventory';
import { IInventorySource } from '../../../shared/models/inventory-source';
import { HelperService } from '../../../shared/services/helper.service';
import { AttributeFamilyService } from '../../attribute-family/services/attribute-family.service';
import { AttributeService } from '../../attribute/attribute.service';
import { ProductFormlyService } from '../services/product-formly.service';
import { ProductValueService } from '../services/product-value.service';
import { ProductService } from '../services/product.service';
import { MessageBusConstant } from './../../../shared/constants/message-bus.constant';
import { PRODUCT_TYPE } from './../../../shared/enums/product-type.enum';
import {
  IProduct,
  IProductFindResponse,
} from './../../../shared/models/product';
import { MessageBusService } from './../../../shared/services/message-bus.service';

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
  navigateOnSuccess = true;

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

      if (data.product) {
        this.product = data.product;
        this.variants = this.product.variants;

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
          type: FORMLY_FIELD_TYPE.text,
          label: 'Name',
        },
      },
      {
        key: 'sku',
        type: 'input',
        props: {
          required: true,
          type: FORMLY_FIELD_TYPE.text,
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

  setConfigurableAttribute() {
    if (!this.product || !this.product['super_attributes']) return;
    const superAttributes: { [key: number]: any[] } =
      this.product['super_attributes'];

    const selectedAttrIds: any[] = Object.keys(
      this.product['super_attributes']
    ).map((e) => +e);

    const selectedAttributes = this.configurableAttributes.filter(
      (attribute: IAttribute) => {
        return selectedAttrIds.includes(attribute.id);
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

  /**
   * Transform selected attribute to save in database
   * 
   * @returns 
   */
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
    console.log(this.form.value);

    if (this.selectedAttributeOptions) {
      params['super_attributes'] = this.transformSelectedAttributeOption();
    }

    if (params?.id) {
      this.subscribeToSaveResponse(this.productService.put(params.id, params));
    } else {
      console.log(params, 'params');
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
    if(this.navigateOnSuccess) {
      this.router.navigate(['/product']);
    }
    this.navigateOnSuccess = true
  }

  submitWithOutNav() {
    this.navigateOnSuccess =false
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

  /**
   * this method is fot testing purpose it sets the model value
   */
  addDefaultValues() {
    const model1 =
      this.productDefaultValueService.getSimpleProductDefaultValue();
    this.model = { ...this.model, ...model1 };
  }

  
  /**
   * this method is fot testing purpose it sets the model value
   */
  addConfigProductDefaultValues() {
    const model1 =
      this.productDefaultValueService.getConfigurableProductDefaultValue();
    this.model = { ...this.model, ...model1 };
  }
}
