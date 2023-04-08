import { Component, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable } from 'rxjs';
import { IProduct } from '../../../shared/models/product';
import { ProductService } from '../services/product.service';
import { SupplierService } from '../../supplier/services/supplier.service';
import { ISupplier } from '../../../shared/models/supplier';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  productForm = this.getForm();
  isSaving = false;
  product!: IProduct;
  suppliers: ISupplier[] = [];

  active = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    private productService: ProductService,
    private supplierService: SupplierService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.product = response.entity;
      if (this.product.id) {
        this.updateForm(this.product);
      }
    });
  }

  getSupplier() {
    this.supplierService.get().subscribe({
      next: (suppliers: ISupplier[]) => {
        this.suppliers = suppliers;
      },
    });
  }

  getForm() {
    return this.fb.group({
      id: [],
      name: ['', Validators.required],
      supplier_id: [''],
      slug: [''],
      sku: [''],
      type: [''],
      description: [''],
      is_new: [''],
      quantity: [0],
      cost: [0, Validators.required],
      mrp: [0, Validators.required],
      price: [0, Validators.required],
      size: [''],
      color: [''],
      status: [1],
      stocks: this.fb.array([]),
    });

    this.addStock();
  }

  get stocks(): FormArray {
    return this.productForm.controls['stocks'] as FormArray;
  }

  addStock() {
    const stockForm = this.fb.group({
      size: [''],
      color: [''],
      quantity: [''],
      cost: [''],
      mrp: [''],
      price: [''],
      status: [1],
    });

    this.stocks.push(stockForm);
  }

  deleteStock(index: number) {
    this.stocks.removeAt(index);
  }

  updateForm(product: IProduct) {
    this.productForm.patchValue({
      id: product.id,
      slug: product.slug,
      sku: product.sku,
      name: product.name,
      description: product.description,
      is_new: product.is_new,
      quantity: product.quantity,
      cost: product.cost,
      mrp: product.mrp,
      price: product.price,
      size: product.size,
      color: product.color,
      status: product.status,
    });
  }

  goBack() {
    this.router.navigate(['entity/product']);
  }

  submit() {
    this.isSaving = true;
    const params = this.productForm.value;
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
    this.router.navigate(['entity/product']);
  }

  protected onSaveError(error: any): void {
    // Api for inheritance.
    this.toastr.error(error.message);
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }
}
