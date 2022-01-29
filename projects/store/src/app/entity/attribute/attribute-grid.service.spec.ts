import { TestBed } from '@angular/core/testing';

import { AttributeGridService } from './attribute-grid.service';

describe('AttributeGridService', () => {
  let service: AttributeGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttributeGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
