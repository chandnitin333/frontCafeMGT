import { TestBed } from '@angular/core/testing';

import { SanckbarService } from './sanckbar.service';

describe('SanckbarService', () => {
  let service: SanckbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanckbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
