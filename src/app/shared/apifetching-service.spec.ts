import { TestBed } from '@angular/core/testing';

import { APIFetchingService } from './apifetching-service';

describe('APIFetchingService', () => {
  let service: APIFetchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIFetchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
