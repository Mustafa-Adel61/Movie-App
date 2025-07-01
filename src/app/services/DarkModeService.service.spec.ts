/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DarkModeServiceService } from './DarkModeService.service';

describe('Service: DarkModeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DarkModeServiceService]
    });
  });

  it('should ...', inject([DarkModeServiceService], (service: DarkModeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
