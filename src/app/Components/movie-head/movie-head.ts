import { Component, effect, inject } from '@angular/core';
import { APIFetchingService } from '../../shared/apifetching-service';
import { IMovie } from '../../interfaces/imovie';

@Component({
  selector: 'app-movie-head',
  templateUrl: './movie-head.html',
  styleUrl: './movie-head.css',
  imports: []
})
export class MovieHead {
  isTransitioning: boolean = false;
  movieFetcher = inject(APIFetchingService);
  maxStars: number = 10;
  intervalStarted = false;

  constructor() {
    effect(() => {
      const results = this.movieFetcher.myHttpResource.value()?.results ?? [];

      if (results.length > 0) {

        this.setRandomMovie(results);

        if (!this.intervalStarted) {
          this.intervalStarted = true;

          setInterval(() => {
            const newResults = this.movieFetcher.myHttpResource.value()?.results ?? [];
            this.setRandomMovie(newResults); 
          }, 5000);
        }
      }
    });
  }

  setRandomMovie(results: IMovie[]) {
    this.isTransitioning = true;

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * results.length);
      this.movieFetcher.randomMovie.set(results[randomIndex]);

      setTimeout(() => {
        this.isTransitioning = false;
      }, 100);
    }, 300);
  }

  get rating(): number {
    return this.movieFetcher.randomMovie()?.vote_average ?? 0;
  }

  get fullStars(): number {
    return Math.round(this.rating);
  }

  get halfStar(): boolean {
    const decimal = this.rating - this.fullStars;
    return decimal >= 0.25 && decimal < 0.75;
  }

  get emptyStars(): number {
    return this.maxStars - this.fullStars - (this.halfStar ? 1 : 0);
  }
}
