import { TestBed } from '@angular/core/testing';

import { TaxGridService } from './tax-grid.service';

describe('TaxGridService', () => {
  let service: TaxGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
