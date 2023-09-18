import { TestBed } from '@angular/core/testing';

import { UserRegister } from './user.service';

describe('UserServiceService', () => {
  let service: UserRegister;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegister);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
