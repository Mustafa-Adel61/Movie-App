import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DataFromAPI {
  lang = signal('en')
  constructor(private _HttpClient: HttpClient) { }

  getData(page: number = 1): Observable<any> {
    return this._HttpClient.get(`${environment.url}discover/movie?api_key=39c7b67b8f5b2832672239362e2395d4&with_original_language=${this.lang()}&page=${page}`)
  }



  getRecommended(movieId: number): Observable<any> {
    return this._HttpClient.get(
      `${environment.url}movie/${movieId}/recommendations?api_key=39c7b67b8f5b2832672239362e2395d4&with_original_language=${this.lang()}`
    );
  }

  getTrending(): Observable<any> {
    return this._HttpClient.get(
      ` ${environment.url}trending/movie/week?api_key=39c7b67b8f5b2832672239362e2395d4&with_original_language=${this.lang()}`
    );
  }

  getMovieDetails(movieId: number): Observable<any> {
    return this._HttpClient.get(
      `${environment.url}movie/${movieId}?api_key=39c7b67b8f5b2832672239362e2395d4&with_original_language=${this.lang()}`
    );
  }


  getMovieTrailer(movieId: number): Observable<any> {
    return this._HttpClient.get(
      `${environment.url}movie/${movieId}/videos?api_key=39c7b67b8f5b2832672239362e2395d4&with_original_language=${this.lang()}`
    );
  }


}
