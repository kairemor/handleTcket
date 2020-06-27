import { TestBed, async, inject } from '@angular/core/testing';

import { ProfileGuardGuard } from './profile-guard.guard';

describe('ProfileGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileGuardGuard]
    });
  });

  it('should ...', inject([ProfileGuardGuard], (guard: ProfileGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
