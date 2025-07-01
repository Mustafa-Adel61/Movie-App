import { Component, OnInit } from '@angular/core';
import { DataFromAPI } from '../../data-from-api';
import { CommonModule } from '@angular/common';
import { IMovie } from '../../interfaces/imovie';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  imagePhath: string = 'https://image.tmdb.org/t/p/w500';
  movieData: IMovie[] = [];

  constructor(private _DataFromAPI: DataFromAPI) { }

  ngOnInit(): void {
    this._DataFromAPI.getData().subscribe({
      next: (res) => {
        console.log(res.results);
        this.movieData = res.results.map((movie: IMovie) => ({
          ...movie,
          isFavorite: false
        }));
      },
      error: (err) => {
        console.error('Error fetching movies', err);
      }
    });
  }

  toggleWishlist(movie: IMovie) {
    movie.isFavorite = !movie.isFavorite;
  }

}
