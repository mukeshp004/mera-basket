import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable } from 'rxjs';
import { IAttributeFamily } from '../../../shared/models/attributes/attribute-family';
import { AttributeFamilyService } from '../services/attribute-family.service';

@Component({
  selector: 'app-attribute-family-upsert',
  templateUrl: './attribute-family-upsert.component.html',
  styleUrls: ['./attribute-family-upsert.component.scss'],
})
export class AttributeFamilyUpsertComponent implements OnInit {
  form = this.getForm();
  isSaving = false;
  attributeFamily!: IAttributeFamily;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private attributeFamilyService: AttributeFamilyService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.attributeFamily = response.entity;
      this.updateForm(this.attributeFamily);
    });
  }

  getForm() {
    return this.fb.group({
      id: [],
      name: ['', Validators.required],
      code: [''],
      is_user_defined: [''],
      status: [1, Validators.required],
    });
  }

  updateForm(attributeFamily: IAttributeFamily) {
    this.form.patchValue(attributeFamily);
  }

  get formControl() {
    return this.form.controls;
  }

  goBack() {
    this.router.navigate(['attribute/family']);
  }

  submit() {
    this.isSaving = true;
    const params = this.form.value;
    console.log(params);
    if (params.id) {
      this.subscribeToSaveResponse(
        this.attributeFamilyService.put(params.id, params)
      );
    } else {
      this.subscribeToSaveResponse(this.attributeFamilyService.post(params));
    }
  }

  protected subscribeToSaveResponse(
    result: Observable<IAttributeFamily>
  ): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: (error) => this.onSaveError,
    });
  }

  protected onSaveSuccess(): void {
    const createdMsg = 'Attribute family created Successfully';
    const updatedMsg = 'Attribute family updated Successfully';

    this.toastr.success(
      this.attributeFamily.id ? updatedMsg : createdMsg,
      'Success'
    );
    // this.router.navigate(['/attribute']);
  }

  protected onSaveError(error: any): void {
    // Api for inheritance.
    this.toastr.error(error.message);
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }
}
