import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttributeToGroupModalComponent } from './add-attribute-to-group-modal.component';

describe('AddAttributeToGroupModalComponent', () => {
  let component: AddAttributeToGroupModalComponent;
  let fixture: ComponentFixture<AddAttributeToGroupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAttributeToGroupModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttributeToGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
