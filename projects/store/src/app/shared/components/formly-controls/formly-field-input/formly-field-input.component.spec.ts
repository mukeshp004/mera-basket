import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldInputComponent } from './formly-field-input.component';

describe('FormlyFieldInputComponent', () => {
  let component: FormlyFieldInputComponent;
  let fixture: ComponentFixture<FormlyFieldInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyFieldInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
