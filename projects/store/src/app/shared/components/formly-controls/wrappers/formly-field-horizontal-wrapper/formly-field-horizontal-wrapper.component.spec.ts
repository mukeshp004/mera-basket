import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldHorizontalWrapperComponent } from './formly-field-horizontal-wrapper.component';

describe('FormlyFieldHorizontalWrapperComponent', () => {
  let component: FormlyFieldHorizontalWrapperComponent;
  let fixture: ComponentFixture<FormlyFieldHorizontalWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldHorizontalWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyFieldHorizontalWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
