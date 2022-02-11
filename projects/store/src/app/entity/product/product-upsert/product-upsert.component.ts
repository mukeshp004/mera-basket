import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable } from 'rxjs';
import { PRODUCT_TYPE } from '../../../shared/enums/product-type.enum';
import { IAttribute } from '../../../shared/models/attributes/attribute';
import { IAttributeFamily } from '../../../shared/models/attributes/attribute-family';
import { IAttributeGroup } from '../../../shared/models/attributes/attribute-group';
import { IProduct } from '../../../shared/models/product';
import { AttributeFamilyService } from '../../attribute-family/services/attribute-family.service';
import { AttributeService } from '../../attribute/attribute.service';
import { CategoryService } from '../../category/category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-upsert',
  templateUrl: './product-upsert.component.html',
  styleUrls: ['./product-upsert.component.scss'],
})
export class ProductUpsertComponent implements OnInit {
  form = this.getForm();
  isSaving = false;
  product!: IProduct;
  productTypes = PRODUCT_TYPE;

  attributes: IAttribute[] = [];
  attributeFamilies: IAttributeFamily[] = [];
  selectedAttributeFamily: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private productService: ProductService,
    private attributeService: AttributeService,
    private attributeFamilyService: AttributeFamilyService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.product = response.entity;
      // this.updateForm(this.product);
    });

    this.getAttributeFamilies();
  }

  getAttributeFamilies() {
    this.attributeFamilyService
      .get()
      .subscribe((attributeFamilies: IAttributeFamily[]) => {
        this.attributeFamilies = attributeFamilies;

        this.onAttributeFamilyChange();
      });
  }

  onAttributeFamilyChange() {
    this.form.get('attribute_family_id')?.valueChanges.subscribe((value) => {
      console.log('Attribute Family change', value);

      console.log(this.attributeFamilies);
      this.selectedAttributeFamily = this.attributeFamilies.find(
        (attributeFamily: IAttributeFamily) => {
          return attributeFamily.id === value;
        }
      );

      this.buildDynamicForm();
    });
  }

  buildDynamicForm() {
    this.selectedAttributeFamily.groups.forEach((group: IAttributeGroup) => {
      if (group && group.name) {
        const g = {} as any;

        group.attributes?.forEach((attribute: IAttribute) => {
          const index = attribute.code || '';
          g[index] = attribute.is_required
            ? new FormControl('', Validators.required)
            : new FormControl('');
        });
        this.form.addControl(group.name, this.fb.group(g));
        // console.log(this.form.controls);
      }
    });
  }

  getForm(): FormGroup {
    return this.fb.group({
      id: [],
      name: [],
      sku: [],
      type: [null, Validators.required],
      attribute_family_id: [null, Validators.required],
      status: ['0', Validators.required],
    });
  }

  updateForm(product: IProduct): void {
    this.form.patchValue({
      id: product.id,
      sku: product.sku,
      type: product.type,
      attribute_family_id: product.attribute_family_id,
      status: ['0', Validators.required],
    });
  }

  goBack() {
    this.router.navigate(['product']);
  }

  submit() {
    this.isSaving = true;
    const params = this.form.value;
    if (params.id) {
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
