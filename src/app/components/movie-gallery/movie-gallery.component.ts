import { Component, OnInit, Input } from '@angular/core';
import { movieService } from 'src/app/services/movie-items.service';
@Component({
  selector: 'app-movie-gallery',
  templateUrl: './movie-gallery.component.html',
  styleUrls: ['./movie-gallery.component.css'],
})
export class MovieGalleryComponent implements OnInit {
  atEnd: boolean = false;
  itemsOnDisplay: number = 10;
  pageCounter: number = 1;
  rawMovieData: any = [];
  movies: any = [];
  results: boolean = true;
  moreDetails: boolean = false;
  selectedID: any = [];
  // inputSearch: string = '';

  constructor(private movieData: movieService) {
    // this.search = 'two way Binding';
  }
  ngOnInit(): void {}
  moreMovieDetails(id: number) {
    if (this.selectedID.includes(id)) {
      this.selectedID = this.selectedID.map((v: any) => {
        if (v !== id) {
          return v;
        }
      });
    } else {
      this.selectedID.push(id);
    }
    // this.moreDetails = !this.moreDetails;
  }
  searchApi() {
    this.movies = this.movieData.getPopularMovies().subscribe((data: any) => {
      this.rawMovieData = data;
      this.movies = this.rawMovieData.items.slice(0, this.itemsOnDisplay);
    });
  }

  moviePagination(forth: boolean) {
    if (forth) {
      this.paginationForth();
    } else {
      if (this.pageCounter !== 1) {
        this.pageCounter--;
        this.pageSlicer();
        if (this.atEnd) {
          this.atEnd = false;
        }
      }
    }
  }

  paginationForth() {
    if (
      (this.pageCounter + 1) * this.itemsOnDisplay <=
      this.rawMovieData.items.length
    ) {
      this.pageCounter++;
      this.pageSlicer();
    } else {
      if (!this.atEnd) {
        (this.movies =
          this.pageCounter * this.itemsOnDisplay - this.itemsOnDisplay),
          this.rawMovieData.items.length;
        this.atEnd = true;
      }
    }
  }

  pageSlicer() {
    this.movies = this.rawMovieData.items.slice(
      this.pageCounter * this.itemsOnDisplay - this.itemsOnDisplay,
      this.pageCounter * this.itemsOnDisplay
    );
  }
}
