// import { Component, OnInit } from '@angular/core';
// import { DataFromAPI } from '../../data-from-api';

// @Component({
//   selector: 'app-wishlist',
//   imports: [],
//   templateUrl: './wishlist.html',
//   styleUrl: './wishlist.css'
// })
// export class Wishlist implements OnInit{
//    wishlist: Imovie[] = [];
//    recommendedMovies: any[] = [];
//    imagePhath: string = 'https://image.tmdb.org/t/p/w500';
//    ///recommended movies
//   constructor(private _DataFromAPI: DataFromAPI) {}

//    ngOnInit(): void {
//     const saved = localStorage.getItem('wishlist');
//     if (saved) {
//       this.wishlist = JSON.parse(saved);
//     }
//    //recommended movies part 

//   }
 



import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataFromAPI } from '../../data-from-api';
import { DarkModeServiceService } from '../../services/DarkModeService.service';
import { CommonModule } from '@angular/common';
import { WishlistCountService } from '../../services/wishlist-count-service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
    imports: [CommonModule, TranslateModule],
  
})
export class Wishlist implements OnInit {

  wishlist: any[] = [];
  recommendedMovies: any[] = [];
  imagePhath: string = 'https://image.tmdb.org/t/p/w500';
  //  @viewChild('scrollContainer', { static: false }) scrollContainer!: ElementRe
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  constructor(private _DataFromAPI: DataFromAPI,public darkModeService:DarkModeServiceService, public _wishlistS: WishlistCountService) {}

  ngOnInit(): void {

    const saved = localStorage.getItem('wishlist');
    if (saved) {
      this.wishlist = JSON.parse(saved);
    }

    if (this.wishlist.length > 0) {
      const movieId = this.wishlist[0].id;
      this._DataFromAPI.getRecommended(movieId).subscribe({
        next: (res) => {
          this.recommendedMovies = res.results;
        },
        error: (err) => {
          console.error('Error fetching recommended movies', err);
        }
      });
    } else {

      this._DataFromAPI.getTrending().subscribe({
        next: (res) => {
          this.recommendedMovies = res.results;
        },
        error: (err) => {
          console.error('Error fetching trending movies', err);
        }
      });
    }
  
    this._wishlistS.GetWishlistCount()
  }

  // ⬇️ إزالة من المفضلة
  removeFromWishlist(movie: any) {
    this.wishlist = this.wishlist.filter(m => m.id !== movie.id);
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    this._wishlistS.GetWishlistCount()
  }

  
    scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

}







 




