import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistCountService {

  constructor() { }

  wishlistCount = signal(0)

  GetWishlistCount(): number {
    const wishlistJson = localStorage.getItem('wishlist');
    if (wishlistJson != null) {
      this.wishlistCount.set(JSON.parse(wishlistJson).length)
      return this.wishlistCount()
    }
    else {
      return 0
    }

  }
}
