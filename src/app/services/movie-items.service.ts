import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class movieService {
  popularMovies: [] | undefined;
  constructor(private http: HttpClient) {}

  getOneMovie(searchWord: any): Observable<[]> {
    return this.http.get<[]>(
      `https://imdb-api.com/en/API/SearchMovie/k_6223cae4/${searchWord}`,
      {
        observe: 'body',
      }
    );
  }

  getPopularMovies(): Observable<[]> {
    return this.http.get<[]>(
      `https://imdb-api.com/en/API/MostPopularMovies/k_6223cae4`,
      {
        observe: 'body',
      }
    );
  }
}
