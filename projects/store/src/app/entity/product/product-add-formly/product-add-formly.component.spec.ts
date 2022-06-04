import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddFormlyComponent } from './product-add-formly.component';

describe('ProductAddFormlyComponent', () => {
  let component: ProductAddFormlyComponent;
  let fixture: ComponentFixture<ProductAddFormlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAddFormlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAddFormlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
