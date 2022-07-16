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
import { FormlyFieldConfig } from '@ngx-formly/core';
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
  attributeFamilies: IAttributeFamily[] = [];
  selectedAttributeFamily: any;
  attributeFamilyOptions: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private productService: ProductService,
    private attributeService: AttributeService,
    private attributeFamilyService: AttributeFamilyService,
    private helperService: HelperService,
    private productFormly: ProductFormlyService
  ) {}

  ngOnInit(): void {
    this.getAttributeFamilies();
  }

  getAttributeFamilies() {
    this.attributeFamilyService
      .get()
      .subscribe((attributeFamilies: IAttributeFamily[]) => {
        this.attributeFamilies = attributeFamilies;

        this.buildFormlyForm();

        this.addDefaultValues();
      });
  }

  buildFormlyForm() {
    this.formFields = [
      {
        key: 'product_type',
        type: 'select',
        defaultValue: PRODUCT_TYPE.Simple,
        templateOptions: {
          label: 'Product Type',
          options: this.productTypeOptions,
          // change: this.onAttributFamilyChange,
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

          change: this.onAttributFamilyChange,
        },
        hooks: {
          onInit: (field?: FormlyFieldConfig) => {
            console.log('only works here for me');
            this.onAttributFamilyChange(field);
          },
        },
      },
    ];
  }

  // onAttributFamilyChange = (formField: any, $event: any) => {
  onAttributFamilyChange = (formField: any) => {
    const value = this.model['attribute_family_id'];

    this.selectedAttributeFamily = this.attributeFamilies.find(
      (attributeFamily: IAttributeFamily) => {
        return attributeFamily.id === value;
      }
    );

    this.appendForm();
  };

  appendForm() {
    const fields: FormlyFieldConfig[] = this.productFormly.formField(
      this.selectedAttributeFamily
    );

    this.formFields = [
      ...this.formFields,
      ...fields,
      this.productFormly.generateInventoryGroup(),
    ];
  }

  goBack() {
    this.router.navigate(['product']);
  }

  submit() {
    this.isSaving = true;
    const params = this.form.value;

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

  addDefaultValues() {
    this.model = {
      product_type: 1,
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
  }
}
