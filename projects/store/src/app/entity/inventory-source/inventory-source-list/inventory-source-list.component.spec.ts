import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorySourceListComponent } from './inventory-source-list.component';

describe('InventorySourceListComponent', () => {
  let component: InventorySourceListComponent;
  let fixture: ComponentFixture<InventorySourceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorySourceListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorySourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
