import { Component, effect, inject, OnInit } from '@angular/core';
import { DataFromAPI } from '../../data-from-api';
import { CommonModule } from '@angular/common';
import { IMovie } from '../../interfaces/imovie';
import { MovieHead } from "../movie-head/movie-head";
import { DarkModeServiceService } from '../../services/DarkModeService.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MovieHead,TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  imagePhath: string = 'https://image.tmdb.org/t/p/w500';
  movieData: IMovie[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  isLoading: boolean = false;

  

  constructor(private _DataFromAPI: DataFromAPI,
    public darkModeService: DarkModeServiceService) {

      effect(() => {
        const currentLang = _DataFromAPI.lang();
        this.loadMovies(1)
      })
     }

     

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(page: number = 1): void {
    this.isLoading = true;
    this._DataFromAPI.getData(page).subscribe({
      next: (res) => {
        console.log(res.results);
        const processedData = res.results.map((movie: IMovie) => ({
          ...movie,
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
    movie.isFavorite = !movie.isFavorite;
  }

}
