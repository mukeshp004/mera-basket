import { TestBed } from '@angular/core/testing';

import { AttributeFamilyGridService } from './attribute-family-grid.service';

describe('AttributeFamilyGridService', () => {
  let service: AttributeFamilyGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttributeFamilyGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
