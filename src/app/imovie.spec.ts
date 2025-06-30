import { TestBed } from '@angular/core/testing';

import { IMovie } from './imovie';

describe('IMovie', () => {
  let service: IMovie;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IMovie);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
