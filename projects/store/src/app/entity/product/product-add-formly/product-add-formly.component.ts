import { finalize, map, Observable, pipe } from 'rxjs';
import { IAttribute } from 'projects/store/src/app/shared/models/attributes/attribute';
import { PRODUCT_TYPE } from './../../../shared/enums/product-type.enum';
import { IProduct } from './../../../shared/models/product';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Pipe, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  form: FormGroup = this.fb.group({});
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
    private fb: FormBuilder,
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
      });
  }

  buildFormlyForm() {
    this.formFields = [
      {
        key: 'name',
        type: 'input',
        defaultValue: '',
        templateOptions: {
          label: 'Name',
          placeholder: 'Name',
          required: true,
        },
        validation: {
          messages: {
            required: (error, field: FormlyFieldConfig) =>
              `"${field?.formControl?.value}" is required`,
          },
        },
      },
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
      },
    ];
  }

  onAttributFamilyChange = (formField: any, $event: any) => {
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

    this.formFields = [...this.formFields, ...fields];
  }

  goBack() {
    this.router.navigate(['product']);
  }

  submit() {
    this.isSaving = true;
    const params = this.form.value;

    console.log(params);
    // if (params.id) {
    //   this.subscribeToSaveResponse(this.productService.put(params.id, params));
    // } else {
    //   this.subscribeToSaveResponse(this.productService.post(params));
    // }
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

    this.toastr.success(this.product.id ? updatedMsg : createdMsg, 'Success');
    this.router.navigate(['/category']);
  }

  protected onSaveError(error: any): void {
    // Api for inheritance.
    this.toastr.error(error.message);
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }
}
