import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGener } from '../interfaces/igener';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenerService {
  private apiUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=39c7b67b8f5b2832672239362e2395d4';

  constructor(private http: HttpClient) {}

  getGenres(): Observable<IGener[]> {
    return this.http.get<{ genres: IGener[] }>(this.apiUrl).pipe(
      map(res => res.genres)
    );
  }
}
