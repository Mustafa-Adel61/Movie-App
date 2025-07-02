import { TestBed } from '@angular/core/testing';

import { WishlistCountService } from './wishlist-count-service';

describe('WishlistCountService', () => {
  let service: WishlistCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
