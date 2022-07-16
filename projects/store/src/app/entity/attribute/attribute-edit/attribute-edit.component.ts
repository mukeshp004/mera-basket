import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable } from 'rxjs';
import { ATTRIBUTE_TYPE } from '../../../shared/enums/attribute-type.enum';
import { ATTRIBUTE_VALIDATION } from '../../../shared/enums/attribute-validation.enum';
import { SWATCH_TYPE } from '../../../shared/enums/columns/swatch-type';
import { IAttribute } from '../../../shared/models/attributes/attribute';
import { AttributeService } from '../attribute.service';

@Component({
  selector: 'app-attribute-edit',
  templateUrl: './attribute-edit.component.html',
  styleUrls: ['./attribute-edit.component.scss'],
})
export class AttributeEditComponent implements OnInit {
  form = this.getForm();
  isSaving = false;
  attribute!: IAttribute;

  attributeTypes = ATTRIBUTE_TYPE;
  attributeValidations = ATTRIBUTE_VALIDATION;
  swatchTypes = SWATCH_TYPE;
  color: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    private attributeService: AttributeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.attribute = response.entity;
      this.updateForm(this.attribute);
    });
  }

  getForm() {
    return this.fb.group({
      id: [],
      name: ['', Validators.required],
      description: [''],
      code: [''],
      type: [],
      swatch_type: [SWATCH_TYPE.TEXT],
      options: this.fb.array([]),
      validation: [''],
      is_required: [0],
      is_unique: [0],
      is_filterable: [0],
      is_configurable: [0],
      is_user_defined: [0],
      is_visible_on_front: [0],
      is_comparable: [0],
      position: [''],
      status: ['0', Validators.required],
    });
  }

  get options() {
    return this.form.get('options') as UntypedFormArray;
  }

  get formControl() {
    return this.form.controls;
  }

  addOption() {
    this.options.push(this.getOptionForm());
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  getOptionForm(): UntypedFormGroup {
    return this.fb.group({
      id: [],
      swatch_value: [],
      value: [],
      name: [],
      position: [],
    });
  }

  isSwatchTypeSelected() {
    console.log(this.formControl);

    this.formControl['swatch_type'].value;
  }

  isMultiOptionType(): boolean {
    return [
      ATTRIBUTE_TYPE.CHECKBOX,
      ATTRIBUTE_TYPE.RADIO,
      ATTRIBUTE_TYPE.SELECT,
      ATTRIBUTE_TYPE.MULTISELECT,
    ].includes(+this.form.value['type']);
  }

  updateForm(attribute: IAttribute) {
    attribute.options?.forEach((element) => {
      this.addOption();
    });
    this.form.patchValue(attribute);
  }

  goBack() {
    this.router.navigate(['attribute']);
  }

  submit() {
    this.isSaving = true;
    const params = this.form.value;
    console.log(params);
    if (params.id) {
      this.subscribeToSaveResponse(
        this.attributeService.put(params.id, params)
      );
    } else {
      this.subscribeToSaveResponse(this.attributeService.post(params));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IAttribute>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: (error) => this.onSaveError,
    });
  }

  protected onSaveSuccess(): void {
    const createdMsg = 'Attribute created Successfully';
    const updatedMsg = 'Attribute updated Successfully';

    this.toastr.success(this.attribute.id ? updatedMsg : createdMsg, 'Success');
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
