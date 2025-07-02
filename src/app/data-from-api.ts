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
    // https://api.themoviedb.org/3/movie/now_playing?api_key=39c7b67b8f5b2832672239362e2395d4&page=1&language=ar
    return this._HttpClient.get(`https://api.themoviedb.org/3/discover/movie?api_key=39c7b67b8f5b2832672239362e2395d4&with_original_language=${this.lang()}&page=${page}`)
    // return this._HttpClient.get("https://api.themoviedb.org/3/genre/movie/list?api_key=39c7b67b8f5b2832672239362e2395d4")
  }
}
