import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyWrapperFormFieldComponent } from './formly-wrapper-form-field.component';

describe('FormlyWrapperFormFieldComponent', () => {
  let component: FormlyWrapperFormFieldComponent;
  let fixture: ComponentFixture<FormlyWrapperFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyWrapperFormFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyWrapperFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
