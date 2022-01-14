import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss'],
})
export class CategoryAddComponent implements OnInit {
  categoryForm = this.getForm();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  getForm() {
    return this.fb.group({
      name: ['', Validators.required],
      slug: [''],
      description: ['', Validators.required],

      meta_title: ['', Validators.required],
      meta_keywords: ['', Validators.required],
      meta_description: ['', Validators.required],

      show_in_menu: ['', Validators.required],
      display_mode: ['', Validators.required],
      status: ['0', Validators.required],
    });
  }

  submit() {
    console.log(this.categoryForm.value);
    const params = this.categoryForm.value;
    this.categoryService.post('categories', params).subscribe(
      (response) => {
        this.toastr.success('Category created Successfully', 'Success');
        this.router.navigate(['/category']);
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.message);
      }
    );
  }
}
