import { TestBed } from '@angular/core/testing';

import { CreateChildService } from './create-child.service';

describe('CreateChildService', () => {
  let service: CreateChildService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateChildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
