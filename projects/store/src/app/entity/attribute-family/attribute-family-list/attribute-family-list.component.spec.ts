import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeFamilyListComponent } from './attribute-family-list.component';

describe('AttributeFamilyListComponent', () => {
  let component: AttributeFamilyListComponent;
  let fixture: ComponentFixture<AttributeFamilyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributeFamilyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeFamilyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
