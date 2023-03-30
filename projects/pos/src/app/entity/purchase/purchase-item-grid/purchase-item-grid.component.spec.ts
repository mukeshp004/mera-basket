import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseItemGridComponent } from './purchase-item-grid.component';

describe('PurchaseItemGridComponent', () => {
  let component: PurchaseItemGridComponent;
  let fixture: ComponentFixture<PurchaseItemGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseItemGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseItemGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
