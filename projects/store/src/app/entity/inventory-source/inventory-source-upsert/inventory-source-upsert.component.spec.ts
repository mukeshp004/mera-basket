import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorySourceUpsertComponent } from './inventory-source-upsert.component';

describe('InventorySourceUpsertComponent', () => {
  let component: InventorySourceUpsertComponent;
  let fixture: ComponentFixture<InventorySourceUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorySourceUpsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorySourceUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
