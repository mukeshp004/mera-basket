import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeFamilyUpsertComponent } from './attribute-family-upsert.component';

describe('AttributeFamilyUpsertComponent', () => {
  let component: AttributeFamilyUpsertComponent;
  let fixture: ComponentFixture<AttributeFamilyUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributeFamilyUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeFamilyUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
