import { TestBed } from '@angular/core/testing';

import { CategoryGridService } from './category-grid.service';

describe('CategoryGridService', () => {
  let service: CategoryGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
