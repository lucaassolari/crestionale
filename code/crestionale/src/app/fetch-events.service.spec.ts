import { TestBed } from '@angular/core/testing';

import { FetchEventsService } from './fetch-events.service';

describe('FetchEventsService', () => {
  let service: FetchEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
