import { Component, effect, inject, OnInit, Signal, signal } from '@angular/core';
import { DataFromAPI } from '../../data-from-api';
import { CommonModule } from '@angular/common';
import { IMovie } from '../../interfaces/imovie';
import { MovieHead } from "../movie-head/movie-head";
import { DarkModeServiceService } from '../../services/DarkModeService.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { WishlistCountService } from '../../services/wishlist-count-service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MovieHead,TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  imagePhath: string = 'https://image.tmdb.org/t/p/w500';
  movieData: IMovie[] = [];
   wishlist:IMovie[]=[];
  currentPage: number = 1;
  totalPages: number = 0;
  isLoading: boolean = false;


  

  constructor(private _DataFromAPI: DataFromAPI,
    public darkModeService: DarkModeServiceService, private _wishlistCountService: WishlistCountService) {

      _wishlistCountService.GetWishlistCount()
      effect(() => {
        const currentLang = _DataFromAPI.lang();
        this.loadMovies(1)
      })

      effect(() => {
        const wishListCount = _wishlistCountService.wishlistCount();
      })
     }

     

  ngOnInit(): void {
    
    const saved = localStorage.getItem('wishlist');
  if (saved) {
    this.wishlist = JSON.parse(saved);
  }

    this.loadMovies();
  }

  loadMovies(page: number = 1): void {
    this.isLoading = true;
    this._DataFromAPI.getData(page).subscribe({
      next: (res) => {
        console.log(res.results);
        const processedData = res.results.map((movie: IMovie) => ({
          ...movie,
         inWishlist: this.wishlist.some(m => m.id === movie.id),

          isFavorite: false
        }));
        // this.totalPages = res.total_pages;
        // this.currentPage = res.page;
        // this.isLoading = false;
        setTimeout(() => {
          this.movieData = processedData;
          this.totalPages = res.total_pages;
          this.currentPage = res.page;
          this.isLoading = false;
        }, 1000);
      },
      error: (err) => {
        setTimeout(() => {
          this.isLoading = false;
          console.error('Error fetching movies', err);
        }, 1000);
      }
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadMovies(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  toggleWishlist(movie: IMovie) {
  movie.inWishlist = !movie.inWishlist;

  if (movie.inWishlist) {
    this.wishlist.push(movie);
  } else {
    this.wishlist = this.wishlist.filter(m => m.id !== movie.id);
  }

  
  localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  this._wishlistCountService.GetWishlistCount()

}


}









