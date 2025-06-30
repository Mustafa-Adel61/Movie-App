import { TestBed } from '@angular/core/testing';

import { DataFromAPI } from './data-from-api';

describe('DataFromAPI', () => {
  let service: DataFromAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFromAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
