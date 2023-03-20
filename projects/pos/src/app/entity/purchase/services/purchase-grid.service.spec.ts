import { TestBed } from '@angular/core/testing';

import { PurchaseGridService } from './purchase-grid.service';

describe('PurchaseGridService', () => {
  let service: PurchaseGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
