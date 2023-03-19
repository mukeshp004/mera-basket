import { TestBed } from '@angular/core/testing';

import { ProductGridService } from './product-grid.service';

describe('ProductGridService', () => {
  let service: ProductGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
