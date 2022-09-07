import { MetaData } from 'ng-event-bus/lib/meta-data';
import { MessageBusConstant } from './../../../shared/constants/message-bus.constant';
import { MessageBusService } from './../../../shared/services/message-bus.service';
import { finalize, map, Observable, pipe } from 'rxjs';
import { IAttribute } from 'projects/store/src/app/shared/models/attributes/attribute';
import { PRODUCT_TYPE } from './../../../shared/enums/product-type.enum';
import { IProduct } from './../../../shared/models/product';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Pipe, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { HelperService } from '../../../shared/services/helper.service';
import { AttributeFamilyService } from '../../attribute-family/services/attribute-family.service';
import { AttributeService } from '../../attribute/attribute.service';
import { ProductService } from '../services/product.service';
import { IAttributeFamily } from '../../../shared/models/attributes/attribute-family';
import { FormlyFieldConfig, FormlyForm } from '@ngx-formly/core';
import { ProductFormlyService } from '../services/product-formly.service';

@Component({
  selector: 'app-product-add-formly',
  templateUrl: './product-add-formly.component.html',
  styleUrls: ['./product-add-formly.component.scss'],
})
export class ProductAddFormlyComponent implements OnInit {
  @ViewChild('formly') formly: any;
  formFields: FormlyFieldConfig[] = [];
  model: any = {};
  form: UntypedFormGroup = this.fb.group({});
  isSaving = false;
  product!: IProduct;
  productTypes = PRODUCT_TYPE;
  productTypeOptions = this.helperService.enum2Options(PRODUCT_TYPE);

  attributes: IAttribute[] = [];
  configurableAttributes: IAttribute[] = [];

  attributeFamilies: IAttributeFamily[] = [];
  selectedAttributeFamily: any;
  attributeFamilyOptions: any[] = [];

  excludeConfigurableAttribute = false;

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
    private messageBus: MessageBusService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.product = response.entity;
      this.updateForm();
      this.getAttributeFamilies();
    });
    // this.getAttributeFamilies();
    this.productsVariantsChangeListener();
  }

  productsVariantsChangeListener() {
    this.messageBus
      .listen(MessageBusConstant.productVariantsChanged)
      .subscribe((payLoad: MetaData) => {
        const variants = payLoad.data;

        console.log('Message Bus listener', variants);
        this.model['variants'] = [];

        variants.forEach((variant: any) => {
          console.log('================', variant);
          let variantValues: any = {
            name: this.model.name,
            sku: `${this.model.sku}-${Object.values(variant)
              .map((option: any) => option.name.toLowerCase())
              .join('-')}`,
          };

          for (let key in variant) {
            variantValues[key] = variant[key].id;
          }

          variantValues = {
            ...variantValues,
            quantity: 0,
            price: 0,
            status: 0,
          };

          console.log(variantValues);

          this.model['variants'].push(variantValues);
        });
      });
  }

  getAttributeFamilies() {
    this.attributeFamilyService
      .get()
      .subscribe((attributeFamilies: IAttributeFamily[]) => {
        this.attributeFamilies = attributeFamilies;

        // this.model = { type: PRODUCT_TYPE.Configurable };
        // this.model = { type: PRODUCT_TYPE.Configurable, variants: [{}, {}] };
        this.buildFormlyForm();

        // this.addDefaultValues();
      });
  }

  buildFormlyForm() {
    this.formFields = this.intFormField();
  }

  intFormField(): FormlyFieldConfig[] {
    return [
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          required: true,
          type: 'text',
          label: 'Name',
        },
      },
      {
        key: 'sku',
        type: 'input',
        templateOptions: {
          required: true,
          type: 'text',
          label: 'SKU',
        },
      },

      {
        key: 'type',
        type: 'select',
        // defaultValue: PRODUCT_TYPE.Simple,
        templateOptions: {
          label: 'Product Type',
          options: this.productTypeOptions,
          change: this.onProductTypeChange,
        },
        expressionProperties: {
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
        templateOptions: {
          label: 'Attribute Family',
          options: this.attributeFamilies,
          valueProp: (option: any) => option.id,
          compareWith: (o1: IAttributeFamily, o2: IAttributeFamily) => {
            return o1 && o2 && o1.id === o2.id;
          },
          labelProp: 'name',

          change: this.onAttributeFamilyChange,
        },
        expressionProperties: {
          'templateOptions.disabled': '!model.name || !model.sku',
        },
        hooks: {
          onInit: (field?: FormlyFieldConfig) => {
            const typeControl = field?.form?.get('type');
            typeControl?.valueChanges.subscribe((value) => {
              console.log(this.model['type']);
              console.log(value);
            });
          },
        },
      },
    ];
  }

  onProductTypeChange = (field: FormlyFieldConfig, $event: any) => {
    this.model = {};
    this.model['type'] = field.formControl?.value;

    this.excludeConfigurableAttribute = false;
    if (this.model['type'] === PRODUCT_TYPE.Configurable) {
      this.excludeConfigurableAttribute = true;
    }

    if (this.model['attribute_family_id']) {
      // this.appendForm();
    }

    // this.onAttributeFamilyChange({});
    // this.appendForm();
  };

  // onAttributFamilyChange = (formField: any, $event: any) => {
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

  getConfigurableAttributes() {
    this.selectedAttributeFamily.groups.forEach((group: any) => {
      group.attributes.forEach((attribute: IAttribute) => {
        if (attribute.is_configurable) {
          this.configurableAttributes.push(attribute);
        }
      });
    });
  }

  appendForm() {
    const fields: FormlyFieldConfig[] = this.productFormly.formFields(
      this.selectedAttributeFamily,
      this.excludeConfigurableAttribute
    );

    // this.formFields = [];

    // this.buildFormlyForm();

    this.formFields = [
      // ...this.formFields.filter((f) =>
      //   ['type', 'attribute_family_id'].includes(f.key as string)
      // ),
      ...this.intFormField(),
      this.productFormly.generateConfigurableGroup(this.configurableAttributes),
      ...fields,
      this.productFormly.generateInventoryGroup(),
    ];

    console.log('this.formFields ==========', this.formFields);
  }

  goBack() {
    this.router.navigate(['product']);
  }

  submit() {
    this.isSaving = true;
    // const params = this.form.value;
    const params = this.model;

    console.log(params);
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
    // this.router.navigate(['/category']);
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

    console.log(this.model);
  }

  addDefaultValues() {
    const model1 = {
      type: 1,
      attribute_family_id: 1,
      general: {
        sku: 'Maggi0001',
        product_number: 'Maggi0001',
        name: 'Maggi',
        url_key: 'maggi',
        tax_category_id: null,
        new: null,
        featured: null,
        visible_individually: true,
        guest_checkout: true,
        status: true,
        color: null,
        size: null,
        brand: null,
      },
      description: {
        short_description: 'Maggi',
        description: 'Maggi',
      },
      meta_description: {
        meta_title: null,
        meta_keywords: null,
        meta_description: null,
      },
      price: {
        price: 10,
        cost: null,
        special_price: null,
        special_price_from: null,
        special_price_to: null,
      },
      shipping: {
        length: null,
        width: null,
        height: null,
        weight: '10',
      },
      inventory: {
        Inventory: null,
      },
    };

    this.model = { ...this.model, ...model1 };
  }
}
