import { TestBed } from '@angular/core/testing';

import { AttributeResolveService } from './attribute-resolve.service';

describe('AttributeResolveService', () => {
  let service: AttributeResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttributeResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
