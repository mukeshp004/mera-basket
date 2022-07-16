import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable } from 'rxjs';
import { ICategory } from '../../../shared/models/category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss'],
})
export class CategoryAddComponent implements OnInit {
  categoryForm = this.getForm();
  isSaving = false;
  category!: ICategory;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.category = response.entity;
      this.updateForm(this.category);
    });
  }

  getForm() {
    return this.fb.group({
      id: [],
      name: ['', Validators.required],
      slug: [''],
      description: ['', Validators.required],

      meta_title: [''],
      meta_keywords: [''],
      meta_description: [''],

      show_in_menu: ['', Validators.required],
      display_mode: ['', Validators.required],
      status: ['0', Validators.required],
    });
  }

  updateForm(category: ICategory) {
    this.categoryForm.patchValue({
      id: category.id,
      name: category.name,
      description: category.description,
      slug: category.slug,
      show_in_menu: category.show_in_menu,
      display_mode: category.display_mode,
    });
  }

  goBack() {
    this.router.navigate(['category']);
  }

  submit() {
    this.isSaving = true;
    const params = this.categoryForm.value;
    if (params.id) {
      this.subscribeToSaveResponse(this.categoryService.put(params.id, params));
    } else {
      this.subscribeToSaveResponse(this.categoryService.post(params));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ICategory>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: (error) => this.onSaveError,
    });
  }

  protected onSaveSuccess(): void {
    const createdMsg = 'Category created Successfully';
    const updatedMsg = 'Category updated Successfully';

    this.toastr.success(this.category.id ? updatedMsg : createdMsg, 'Success');
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
