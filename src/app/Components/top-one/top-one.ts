import { Component, effect, inject, signal } from '@angular/core';
import { APIFetchingService } from '../../shared/apifetching-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-one',
  imports: [CommonModule],
  templateUrl: './top-one.html',
  styleUrl: './top-one.css'
})
export class TopOne {
  MovieFetcher = inject(APIFetchingService)
  constructor() {
    effect(() => {
      const results = this.MovieFetcher.myHttpResource.value()?.results
      if (results.length > 0) {
        const randomIndex = Math.round(Math.random() * results.length);
        this.MovieFetcher.randomMovie.set(results[randomIndex])
      }
    })
  }

  get rating(): number {
    return this.MovieFetcher.randomMovie()?.vote_average ?? 0;
  }
  maxStars: number = 10;

  get fullStars(): number {
    return Math.round(this.rating);
  }

  get halfStar(): boolean {
    return this.rating - this.fullStars >= 0.25 && this.rating - this.fullStars < 0.75;
  }

  get emptyStars(): number {
    return this.maxStars - this.fullStars - (this.halfStar ? 1 : 0);
  }

}