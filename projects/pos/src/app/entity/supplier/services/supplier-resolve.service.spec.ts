import { TestBed } from '@angular/core/testing';

import { SupplierResolveService } from './supplier-resolve.service';

describe('SupplierResolveService', () => {
  let service: SupplierResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
