import { TestBed } from '@angular/core/testing';

import { TwitterserviceService } from './twitterservice.service';

describe('TwitterserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TwitterserviceService = TestBed.get(TwitterserviceService);
    expect(service).toBeTruthy();
  });
});
