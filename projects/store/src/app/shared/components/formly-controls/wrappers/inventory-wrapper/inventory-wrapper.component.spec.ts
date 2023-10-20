import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryWrapperComponent } from './inventory-wrapper.component';

describe('InventoryWrapperComponent', () => {
  let component: InventoryWrapperComponent;
  let fixture: ComponentFixture<InventoryWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
