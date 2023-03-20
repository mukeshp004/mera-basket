import { TestBed } from '@angular/core/testing';

import { SalesResolveService } from './sales-resolve.service';

describe('SalesResolveService', () => {
  let service: SalesResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
