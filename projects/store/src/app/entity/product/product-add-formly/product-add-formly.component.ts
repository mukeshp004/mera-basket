import { MetaData } from 'ng-event-bus/lib/meta-data';
import { MessageBusConstant } from './../../../shared/constants/message-bus.constant';
import { MessageBusService } from './../../../shared/services/message-bus.service';
import { finalize, map, Observable, pipe } from 'rxjs';
import { IAttribute } from 'projects/store/src/app/shared/models/attributes/attribute';
import { PRODUCT_TYPE } from './../../../shared/enums/product-type.enum';
import {
  IProduct,
  IProductFindResponse,
} from './../../../shared/models/product';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Pipe,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  FormGroup,
} from '@angular/forms';
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
  configurableformFields: FormlyFieldConfig = {};
  model: any = {};
  form: UntypedFormGroup = this.fb.group({});
  isSaving = false;
  product!: IProduct;
  productTypes = PRODUCT_TYPE;
  productTypeOptions = this.helperService.enum2Options(PRODUCT_TYPE);

  attributes: IAttribute[] = [];
  configurableAttributes: IAttribute[] = [];

  attributeFamilies: IAttributeFamily[] = [];
  selectedAttributeFamily?: IAttributeFamily;
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
    private messageBus: MessageBusService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      const data: IProductFindResponse = response.entity;

      if (data) {
        this.product = data.product;
        this.selectedAttributeFamily = data.attributeFamily;
        this.updateForm();
        // this.addDefaultValues();
      }
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
            status: 1,
          };

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
        // this.updateForm();
        this.buildFormlyForm();

        // setTimeout(() => {
        //   this.updateForm();
        // }, 1000);

        // this.addDefaultValues();
        this.addConfigProductDefaultValues(); // added for testing purpose
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
        props: {
          required: true,
          type: 'text',
          label: 'Name',
        },
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
        props: {
          label: 'Attribute Family',
          placeholder: 'Select Attribute Family',
          options: this.attributeFamilies,
          valueProp: (option: any) => option.id,
          compareWith: (o1: IAttributeFamily, o2: IAttributeFamily) => {
            return o1 && o2 && o1.id === o2.id;
          },
          labelProp: 'name',

          change: this.onAttributeFamilyChange,
        },
        expressions: {
          'templateOptions.disabled': '!model.name || !model.sku',
        },
        hooks: {
          onInit: (field?: FormlyFieldConfig) => {
            this.onAttributeFamilyChange(field);
          },
          // onChanges: (field?: FormlyFieldConfig) => {
          //   console.log('onChanges', field?.model);
          //   this.onAttributeFamilyChange(field);
          // },
        },
      },
    ];
  }

  onProductTypeChange = (field: FormlyFieldConfig, $event: any) => {
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
    this.form = new FormGroup({});
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

  getConfigurableAttributes() {
    this.configurableAttributes = [];
    this.selectedAttributeFamily?.groups?.forEach((group: any) => {
      group.attributes.forEach((attribute: IAttribute) => {
        if (attribute.is_configurable) {
          this.configurableAttributes.push(attribute);
        }
      });
    });
  }

  appendForm() {
    if (this.selectedAttributeFamily) {
      const fields: FormlyFieldConfig[] = this.productFormly.formFields(
        this.selectedAttributeFamily,
        this.excludeConfigurableAttribute
      );

      // this.formFields = [];

      // this.buildFormlyForm();

      this.formFields = [...this.intFormField()];

      if (this.model['type'] === PRODUCT_TYPE.Configurable) {
        this.configurableformFields =
          this.productFormly.generateConfigurableGroup(
            this.configurableAttributes
          );

        this.formFields.push(this.configurableformFields);
      }

      this.formFields.push(...fields);

      this.formFields.push(this.productFormly.generateInventoryGroup());
    }
  }

  goBack() {
    this.router.navigate(['product']);
  }

  submit() {
    this.isSaving = true;
    // const params = this.form.value;
    const params = this.model;

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
    this.model['name'] = this.product['general']['name']
      ? this.product['general']['name']
      : 'shirt';

    this.model['meta_description'] = this.product['meta_description'];

    // this.model['type'] = 2;
  }

  addDefaultValues() {
    const model1 = {
      name: 'Maggi',
      sku: 'Maggi0001',
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

  addConfigProductDefaultValues() {
    const model1 = {
      name: 'jeans',
      sku: 'j001 ',
      type: 2,
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
