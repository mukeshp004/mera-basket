import { TestBed } from '@angular/core/testing';

import { Attribute2formlyService } from './attribute2formly.service';

describe('Attribute2formlyService', () => {
  let service: Attribute2formlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Attribute2formlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
