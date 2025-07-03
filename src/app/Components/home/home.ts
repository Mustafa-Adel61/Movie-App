import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { SpinnerComponent } from './../../shared/Spinner/Spinner.component';
import { PaginationComponent } from '../../shared/Pagination/Pagination.component';

import { DataFromAPI } from '../../data-from-api';
import { WishlistCountService } from '../../services/wishlist-count-service';
import { DarkModeServiceService } from '../../services/DarkModeService.service';
import { GenerService } from '../../services/gener-service';

import { IMovie } from '../../interfaces/imovie';
import { IGener } from '../../interfaces/igener';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    SpinnerComponent,
    PaginationComponent,
    FormsModule
  ],
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
  generList: IGener[] = [];
  selectedGenreId: number | null = null;

  constructor(
    private _DataFromAPI: DataFromAPI,
    public darkModeService: DarkModeServiceService,
    private _wishlistCountService: WishlistCountService,
    public _generService: GenerService
  ) {
    effect(() => {
      const currentLang = this._DataFromAPI.lang();
      this.loadMovies(1);
    });

    effect(() => {
      const wishListCount = this._wishlistCountService.wishlistCount();
    });
  }

  ngOnInit(): void {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      this.wishlist = JSON.parse(saved);
    }

    this.loadMovies();
    this.fetchGenres();
  }

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
          this.applyFilters(); 
          this.totalPages = res.total_pages;
          this.currentPage = res.page;
          this.isLoading = false;
        }, 1000);
      },
      error: (err) => {
        console.error('Error fetching movies', err);
        this.isLoading = false;
      }
    });
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
    this.applyFilters();
  }

  onSearch(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    const query = this.searchQuery.toLowerCase().trim();

    this.filteredMovies = this.movieData.filter(movie => {
      const matchesSearch = (movie.title || movie.original_title || '').toLowerCase().includes(query);
      const matchesGenre = this.selectedGenreId === null || movie.genre_ids.includes(this.selectedGenreId);
      return matchesSearch && matchesGenre;
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadMovies(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
