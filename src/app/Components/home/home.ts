import { Component, effect, OnInit } from '@angular/core';
import { DataFromAPI } from '../../data-from-api';
import { CommonModule } from '@angular/common';
import { IMovie } from '../../interfaces/imovie';
import { DarkModeServiceService } from '../../services/DarkModeService.service';
import { TranslateModule } from '@ngx-translate/core';
import { WishlistCountService } from '../../services/wishlist-count-service';
import { GenerService } from '../../services/gener-service';
import { IGener } from '../../interfaces/igener';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  imagePhath: string = 'https://image.tmdb.org/t/p/w500';
  movieData: IMovie[] = [];
  filteredMovies: IMovie[] = [];
  wishlist: IMovie[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  isLoading: boolean = false;
  generList: IGener[] = [];
  selectedGenreId: number | null = null;

  constructor(
    private _DataFromAPI: DataFromAPI,
    public darkModeService: DarkModeServiceService,
    private _wishlistCountService: WishlistCountService,
    public _generService: GenerService
  ) {
    _wishlistCountService.GetWishlistCount();

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

    this.loadMovies();
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
    this._wishlistCountService.GetWishlistCount();
  }

  onGenreSelected(genreId: number | null) {
    this.selectedGenreId = genreId;

    if (genreId === null) {
      this.filteredMovies = this.movieData;
    } else {
      this.filteredMovies = this.movieData.filter(movie =>
        movie.genre_ids.includes(genreId)
      );
    }
  }
}
