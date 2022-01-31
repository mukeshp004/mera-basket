import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAccordion, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable } from 'rxjs';
import { IAttribute } from '../../../shared/models/attributes/attribute';
import { IAttributeFamily } from '../../../shared/models/attributes/attribute-family';
import { IAttributeGroup } from '../../../shared/models/attributes/attribute-group';
import { AttributeService } from '../../attribute/attribute.service';
import { AddAttributeToGroupModalComponent } from '../modals/add-attribute-to-group-modal/add-attribute-to-group-modal.component';
import { AddGroupComponent } from '../modals/add-group/add-group.component';
import { AttributeFamilyService } from '../services/attribute-family.service';

@Component({
  selector: 'app-attribute-family-upsert',
  templateUrl: './attribute-family-upsert.component.html',
  styleUrls: ['./attribute-family-upsert.component.scss'],
})
export class AttributeFamilyUpsertComponent implements OnInit {
  @ViewChild('accordion') accordion!: NgbAccordion;
  form = this.getForm();
  isSaving = false;
  attributes: IAttribute[] = [];
  attributeFamily!: IAttributeFamily;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private attributeService: AttributeService,
    private attributeFamilyService: AttributeFamilyService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.attributeFamily = response.entity;
      this.updateForm(this.attributeFamily);

      this.getAttributes();
    });
  }

  getAttributes() {
    this.attributeService.get().subscribe((attributes: IAttribute[]) => {
      this.attributes = attributes;
      this.removeUsedAttributes;
    });
  }

  removeUsedAttributes() {}

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

  openAddGroupModal() {
    const modalRef = this.modalService.open(AddGroupComponent);
    modalRef.componentInstance.add.subscribe((data: any) => {
      console.log(data);
      this.addGroup(data);
    });
  }

  addGroup(group: IAttributeGroup): void {
    this.attributeFamily.groups?.push(group);
  }

  addAttributeToGroup(group: IAttributeGroup) {
    const modalRef = this.modalService.open(AddAttributeToGroupModalComponent);
    modalRef.componentInstance.group = group;
    modalRef.componentInstance.attributes = this.attributes;
  }

  deleteAttributeFromGroup(
    group: IAttributeGroup,
    attribute: IAttribute
  ): void {
    if (!group.attributes) return;
    const index = group.attributes.findIndex((a) => a.id === attribute.id);

    group.attributes?.splice(index, 1);
  }
}
