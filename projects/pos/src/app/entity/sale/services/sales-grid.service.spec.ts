import { TestBed } from '@angular/core/testing';

import { SalesGridService } from './sales-grid.service';

describe('SalesGridService', () => {
  let service: SalesGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
