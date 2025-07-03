
import { SpinnerComponent } from './../../shared/Spinner/Spinner.component';
import { Component, effect, inject, OnInit, Signal, EventEmitter } from '@angular/core';
import { DataFromAPI } from '../../data-from-api';
import { CommonModule } from '@angular/common';
import { IMovie } from '../../interfaces/imovie';
import { DarkModeServiceService } from '../../services/DarkModeService.service';
import { TranslateModule } from '@ngx-translate/core';
import { WishlistCountService } from '../../services/wishlist-count-service';
import { GenerService } from '../../services/gener-service';
import { IGener } from '../../interfaces/igener';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../shared/Pagination/Pagination.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TranslateModule, RouterModule, SpinnerComponent, PaginationComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  imagePhath: string = 'https://image.tmdb.org/t/p/w500';
  movieData: IMovie[] = [];
  filteredMovies: IMovie[] = [];
  wishlist: IMovie[] = [];

  currentPage = 1;
  totalPages = 0;
  isLoading = false;
  searchQuery: string = '';
  filteredMovies: IMovie[] = [];
    generList: IGener[] = [];
  selectedGenreId: number | null = null;
  
  constructor(private _DataFromAPI: DataFromAPI,
    public darkModeService: DarkModeServiceService, private _wishlistCountService: WishlistCountService, public _generService: GenerService) {

    _wishlistCountService.GetWishlistCount()

    effect(() => {
      const currentLang = _DataFromAPI.lang();
      this.loadMovies(1);
    });

    effect(() => {
      const wishListCount = _wishlistCountService.wishlistCount();
    });

    this.fetchGenres();
  }

  ngOnInit(): void {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      this.wishlist = JSON.parse(saved);
    }


    constructor(private _DataFromAPI: DataFromAPI,
      public darkModeService: DarkModeServiceService, private _wishlistCountService: WishlistCountService ) {

        _wishlistCountService.GetWishlistCount()
        effect(() => {
          const currentLang = _DataFromAPI.lang();
          this.loadMovies(1)
        })


  fetchGenres() {
    this._generService.getGenres().subscribe({
      next: (genres) => {
        this.generList = genres;
      },
      error: (err) => {
        console.error('Error loading genres:', err);
      }
    });
  }

  loadMovies(page: number = 1): void {
    this.isLoading = true;
    this._DataFromAPI.getData(page).subscribe({
      next: (res) => {
        const processedData = res.results.map((movie: IMovie) => ({
          ...movie,
          inWishlist: this.wishlist.some(m => m.id === movie.id),
          isFavorite: false
        }));

        setTimeout(() => {
          this.movieData = processedData;
          this.filteredMovies = processedData; // بدايةً نعرض الكل
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


  toggleWishlist(movie: IMovie) {
    movie.inWishlist = !movie.inWishlist;

    if (movie.inWishlist) {
      this.wishlist.push(movie);
    } else {
      this.wishlist = this.wishlist.filter(m => m.id !== movie.id);
    }

    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    this._wishlistCountService.GetWishlistCount();
  }


  onGenreSelected(genreId: number | null) {
    this.selectedGenreId = genreId;

//////////////////////search
onSearch(): void {
  const query = this.searchQuery.toLowerCase().trim();
  this.filteredMovies = this.movieData.filter(movie =>
    (movie.title || movie.original_title || '').toLowerCase().includes(query)
  );


    if (genreId === null) {
      this.filteredMovies = this.movieData;
    } else {
      this.filteredMovies = this.movieData.filter(movie =>
        movie.genre_ids.includes(genreId)
      );
    }
  }
}

  }
