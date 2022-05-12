import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class movieService {
  popularMovies: [] | undefined;
  constructor(private http: HttpClient) {}

  getOneMovie(searchWord: any): Observable<[]> {
    return this.http.get<[]>(`  http://localhost:5000/${searchWord}`, {
      observe: 'body',
      // responseType: 'json',
      //   headers: new HttpHeaders().set('JsonOdds-API-Key', this.apiKey),
    });
    //   .subscribe((data) => this.popularMovies?.push(data));
    // this.popularMovies.push(popularMovieResults);
  }

  getPopularMovies(): Observable<[]> {
    return this.http.get<[]>('http://localhost:5000/popular', {
      observe: 'body',
      //   headers: new HttpHeaders().set('JsonOdds-API-Key', this.apiKey),
    });
    //   .subscribe((data) => this.popularMovies?.push(data));
    // this.popularMovies.push(popularMovieResults);
  }
}
