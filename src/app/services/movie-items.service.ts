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
    return this.http.get<[]>(`http://localhost:5000/${searchWord}`, {
      observe: 'body',
    });
  }

  getPopularMovies(): Observable<[]> {
    return this.http.get<[]>('http://localhost:5000/popular', {
      observe: 'body',
    });
  }
}
