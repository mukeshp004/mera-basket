import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierDropdownComponent } from './supplier-dropdown.component';

describe('SupplierDropdownComponent', () => {
  let component: SupplierDropdownComponent;
  let fixture: ComponentFixture<SupplierDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
