import { Component, OnInit, Input } from '@angular/core';
import { movieService } from 'src/app/services/movie-items.service';
@Component({
  selector: 'app-movie-gallery',
  templateUrl: './movie-gallery.component.html',
  styleUrls: ['./movie-gallery.component.css'],
})
export class MovieGalleryComponent implements OnInit {
  movies: any = {
    items: [],
  };
  constructor(private movieData: movieService) {}
  ngOnInit(): void {}

  searchApi() {
    this.movies = this.movieData.getPopularMovies().subscribe((data: any) => {
      console.log(data);
      this.movies = data;
    });
    // this.http.get(this.ROOT_URL + '/example');
    // movieService.getPopularMovies()
  }
}
