import { TestBed } from '@angular/core/testing';

import { AttributeFamilyResolveService } from './attribute-family-resolve.service';

describe('AttributeFamilyResolveService', () => {
  let service: AttributeFamilyResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttributeFamilyResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
