import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyCategoryDropdownComponent } from './formly-category-dropdown.component';

describe('FormlyCategoryDropdownComponent', () => {
  let component: FormlyCategoryDropdownComponent;
  let fixture: ComponentFixture<FormlyCategoryDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyCategoryDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyCategoryDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
