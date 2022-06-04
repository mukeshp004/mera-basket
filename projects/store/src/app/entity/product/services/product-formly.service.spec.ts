import { TestBed } from '@angular/core/testing';

import { ProductFormlyService } from './product-formly.service';

describe('ProductFormlyService', () => {
  let service: ProductFormlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductFormlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
