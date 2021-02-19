import { TestBed } from '@angular/core/testing';

import { LogregGuard } from './logreg.guard';

describe('LogregGuard', () => {
  let guard: LogregGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LogregGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
