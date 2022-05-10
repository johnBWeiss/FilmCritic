import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class movieService {
  popularMovies: [] | undefined;
  apiKey = 'k_6223cae4'; //TODO env
  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<[]> {
    return this.http.get<[]>(
      'https://imdb-api.com/en/API/MostPopularMovies/k_6223cae4',
      {
        observe: 'body',
        responseType: 'json',
        //   headers: new HttpHeaders().set('JsonOdds-API-Key', this.apiKey),
      }
    );
    //   .subscribe((data) => this.popularMovies?.push(data));
    // this.popularMovies.push(popularMovieResults);
  }
}
