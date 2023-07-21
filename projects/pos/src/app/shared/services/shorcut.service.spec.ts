import { TestBed } from '@angular/core/testing';

import { ShorcutKeysService } from './shorcut-keys.service';

describe('ShorcutService', () => {
  let service: ShorcutKeysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShorcutKeysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
