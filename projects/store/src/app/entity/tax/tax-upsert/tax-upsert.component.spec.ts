import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxUpsertComponent } from './tax-upsert.component';

describe('TaxUpsertComponent', () => {
  let component: TaxUpsertComponent;
  let fixture: ComponentFixture<TaxUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxUpsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
