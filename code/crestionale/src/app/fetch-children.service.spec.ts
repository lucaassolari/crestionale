import { TestBed } from '@angular/core/testing';

import { FetchChildrenService } from './fetch-children.service';

describe('FetchChildrenService', () => {
  let service: FetchChildrenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchChildrenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
