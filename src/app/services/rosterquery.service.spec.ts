import { TestBed } from '@angular/core/testing';

import { RosterqueryService } from './rosterquery.service';

describe('RosterqueryService', () => {
  let service: RosterqueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RosterqueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
