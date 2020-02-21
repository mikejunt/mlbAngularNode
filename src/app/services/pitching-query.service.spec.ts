import { TestBed } from '@angular/core/testing';

import { PitchingQueryService } from './pitching-query.service';

describe('PitchingQueryService', () => {
  let service: PitchingQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PitchingQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
