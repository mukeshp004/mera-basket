import { TestBed } from '@angular/core/testing';

import { SupplierGridService } from './supplier-grid.service';

describe('SupplierGridService', () => {
  let service: SupplierGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
