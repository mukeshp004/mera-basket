import { TestBed } from '@angular/core/testing';

import { InventorySourceService } from './inventory-source.service';

describe('InventorySourceService', () => {
  let service: InventorySourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventorySourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
