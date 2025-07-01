import { httpResource } from '@angular/common/http';
import { effect, Injectable, signal } from '@angular/core';
import { IMovie } from '../interfaces/imovie';

@Injectable({
  providedIn: 'root'
})
export class APIFetchingService {

  constructor() {
  
  effect(() => {
    const lang = this.selectedLang(); 

  });

 
  effect(() => {
    if (this.myHttpResource.status() === 'error') {
      this.RetryWithNewId();
    }
  });
}

  movieId = signal(this.GetRandomMovieId())
  GetRandomMovieId(): number {
    return Math.floor(Math.random() * (100000 - 50000)) + 50000;
  }
  // myHttpResource = httpResource<IMovie>(() => ({
  //   url: `https://api.themoviedb.org/3/movie/${this.movieId()}`,
  //   method: 'GET',
  //   params: {
  //     api_key: '71176c25ab76db9f6c4d600ebeb7eb92',
  //     language: 'fr'
  //   }
  // }));

  selectedLang = signal('ar'); // أو 'ar', 'en', 'es', ...
  randomMovie = signal<IMovie | null>(null)

  myHttpResource = httpResource<any>(() => ({
    url: 'https://api.themoviedb.org/3/discover/movie',
    method: 'GET',
    params: {
      api_key: '71176c25ab76db9f6c4d600ebeb7eb92',
      sort_by: 'popularity.desc',
      with_original_language: this.selectedLang()
    }
  }));
  get firstMovie() {
    return this.myHttpResource.value()?.results?.[0];
  }



  RetryWithNewId() {
    this.movieId.set(this.GetRandomMovieId())
  }
}
