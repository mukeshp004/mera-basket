import { Component, OnInit } from '@angular/core';
import { IInventorySource } from '../../../shared/models/inventory-source';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InventorySourceService } from '../services/inventory-source.service';
import { Observable, finalize } from 'rxjs';

@Component({
  selector: 'app-inventory-source-upsert',
  templateUrl: './inventory-source-upsert.component.html',
  styleUrls: ['./inventory-source-upsert.component.scss'],
})
export class InventorySourceUpsertComponent implements OnInit {
  form = this.getForm();
  isSaving = false;
  inventorySource!: IInventorySource;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private inventorySourceService: InventorySourceService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.inventorySource = response.entity;
      this.updateForm(this.inventorySource);
    });
  }

  getForm() {
    return this.fb.group({
      id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      contact_name: [''],
      contact_email: [''],
      contact_number: [''],
      contact_fax: [''],
      country: [''],
      state: [''],
      city: [''],
      street: [''],
      postcode: [''],
      priority: [''],
      latitude: [''],
      longitude: [''],

      status: [0, Validators.required],
    });
  }

  updateForm(inventorySource: IInventorySource) {
    this.form.patchValue({ ...inventorySource });
  }

  goBack() {
    this.router.navigate(['inventory-source']);
  }

  submit() {
    this.isSaving = true;
    const params = this.form.value;
    if (params.id) {
      this.subscribeToSaveResponse(
        this.inventorySourceService.put(params.id, params)
      );
    } else {
      this.subscribeToSaveResponse(this.inventorySourceService.post(params));
    }
  }

  protected subscribeToSaveResponse(
    result: Observable<IInventorySource>
  ): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: (error) => this.onSaveError,
    });
  }

  protected onSaveSuccess(): void {
    const createdMsg = 'Category created Successfully';
    const updatedMsg = 'Category updated Successfully';

    this.toastr.success(
      this.inventorySource.id ? updatedMsg : createdMsg,
      'Success'
    );
    this.router.navigate(['/inventory-source']);
  }

  protected onSaveError(error: any): void {
    // Api for inheritance.
    this.toastr.error(error.message);
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }
}
