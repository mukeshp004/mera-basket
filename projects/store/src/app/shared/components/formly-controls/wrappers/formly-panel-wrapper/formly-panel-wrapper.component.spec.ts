import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyPanelWrapperComponent } from './formly-panel-wrapper.component';

describe('FormlyPanelWrapperComponent', () => {
  let component: FormlyPanelWrapperComponent;
  let fixture: ComponentFixture<FormlyPanelWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyPanelWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyPanelWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
