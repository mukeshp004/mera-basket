import { TestBed } from '@angular/core/testing';

import { PurchaseItemGridService } from './purchase-item-grid.service';

describe('PurchaseItemGridService', () => {
  let service: PurchaseItemGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseItemGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
