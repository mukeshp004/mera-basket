import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldVerticalWrapperComponent } from './formly-field-vertical-wrapper.component';

describe('FormlyFieldVerticalWrapperComponent', () => {
  let component: FormlyFieldVerticalWrapperComponent;
  let fixture: ComponentFixture<FormlyFieldVerticalWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldVerticalWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyFieldVerticalWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
