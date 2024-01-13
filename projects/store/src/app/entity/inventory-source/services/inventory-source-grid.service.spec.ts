import { TestBed } from '@angular/core/testing';

import { InventorySourceGridService } from './inventory-source-grid.service';

describe('InventorySourceGridService', () => {
  let service: InventorySourceGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventorySourceGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
