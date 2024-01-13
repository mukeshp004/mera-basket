import { TestBed } from '@angular/core/testing';

import { InventorySourceResolveService } from './inventory-source-resolve.service';

describe('InventorySourceResolveService', () => {
  let service: InventorySourceResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventorySourceResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
