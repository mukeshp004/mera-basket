import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldImageUploadComponent } from './formly-field-image-upload.component';

describe('FormlyFieldImageUploadComponent', () => {
  let component: FormlyFieldImageUploadComponent;
  let fixture: ComponentFixture<FormlyFieldImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldImageUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyFieldImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
