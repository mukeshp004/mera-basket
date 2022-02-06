import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable } from 'rxjs';
import { PRODUCT_TYPE } from '../../../shared/enums/product-type.enum';
import { IAttributeFamily } from '../../../shared/models/attributes/attribute-family';
import { IProduct } from '../../../shared/models/product';
import { AttributeFamilyService } from '../../attribute-family/services/attribute-family.service';
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
  attributeFamilies: IAttributeFamily[] = [];
  productTypes = PRODUCT_TYPE;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService,
    private attributeFamilyService: AttributeFamilyService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.product = response.entity;
      // this.updateForm(this.product);
    });

    this.attributeFamilyService.get().subscribe((attributeFamilies) => {
      this.attributeFamilies = attributeFamilies;
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
