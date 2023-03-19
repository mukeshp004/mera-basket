import { TestBed } from '@angular/core/testing';

import { CategoryResolveService } from './category-resolve.service';

describe('CategoryResolveServieService', () => {
  let service: CategoryResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
