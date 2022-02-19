import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldToggleComponent } from './formly-field-toggle.component';

describe('FormlyFieldToggleComponent', () => {
  let component: FormlyFieldToggleComponent;
  let fixture: ComponentFixture<FormlyFieldToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyFieldToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
