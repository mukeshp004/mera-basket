import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldSelectComponent } from './formly-field-select.component';

describe('FormlyFieldSelectComponent', () => {
  let component: FormlyFieldSelectComponent;
  let fixture: ComponentFixture<FormlyFieldSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyFieldSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
