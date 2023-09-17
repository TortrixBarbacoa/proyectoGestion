import { TestBed } from '@angular/core/testing';

import { UserProfileInfoService } from './user-profile-info.service';

describe('UserProfileInfoService', () => {
  let service: UserProfileInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfileInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
