import { TestBed } from '@angular/core/testing';

import { HittingQueryService } from './hitting-query.service';

describe('HittingQueryService', () => {
  let service: HittingQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HittingQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
