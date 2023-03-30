import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, finalize } from 'rxjs';
import { ISupplier } from '../../../shared/models/supplier';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.scss'],
})
export class SupplierAddComponent implements OnInit {
  form = this.getForm();
  isSaving = false;
  supplier!: ISupplier;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    private supplierService: SupplierService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.supplier = response.entity;
      this.updateForm(this.supplier);
    });
  }

  getForm() {
    return this.fb.group({
      id: [],
      name: ['', Validators.required],
      email: [''],
      phone: [''],
      comment: [''],
      status: [1, Validators.required],
    });
  }

  updateForm(supplier: ISupplier) {
    this.form.patchValue(supplier);
  }

  goBack() {
    this.router.navigate(['entity/supplier']);
  }

  submit() {
    this.isSaving = true;
    const params = this.form.value;
    if (params.id) {
      this.subscribeToSaveResponse(this.supplierService.put(params.id, params));
    } else {
      this.subscribeToSaveResponse(this.supplierService.post(params));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ISupplier>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: (error) => this.onSaveError,
    });
  }

  protected onSaveSuccess(): void {
    const createdMsg = 'Supplier created Successfully';
    const updatedMsg = 'Supplier updated Successfully';

    this.toastr.success(this.supplier.id ? updatedMsg : createdMsg, 'Success');
    this.router.navigate(['entity/supplier']);
  }

  protected onSaveError(error: any): void {
    // Api for inheritance.
    this.toastr.error(error.message);
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }
}
