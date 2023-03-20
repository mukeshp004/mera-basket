import { TestBed } from '@angular/core/testing';

import { PurchaseResolveService } from './purchase-resolve.service';

describe('PurchaseResolveService', () => {
  let service: PurchaseResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
