import { Component, OnInit, Input } from '@angular/core';
import { movieService } from 'src/app/services/movie-items.service';
@Component({
  selector: 'app-movie-gallery',
  templateUrl: './movie-gallery.component.html',
  styleUrls: ['./movie-gallery.component.css'],
})
export class MovieGalleryComponent implements OnInit {
  itemsOnDisplay: number = 10;
  pageCounter: any = 1;
  rawMovieData: any = [];
  movies: any = {
    items: [],
  };
  constructor(private movieData: movieService) {}
  ngOnInit(): void {}

  searchApi() {
    this.movies = this.movieData.getPopularMovies().subscribe((data: any) => {
      this.rawMovieData = data;
      this.movies = this.rawMovieData.items.slice(0, this.itemsOnDisplay);
    });
    // this.http.get(this.ROOT_URL + '/example');
    // movieService.getPopularMovies()
  }

  moviePagination(back: boolean, forth: boolean) {
    if (forth) {
      this.pageCounter++;
      console.log(this.pageCounter);

      this.paginationForth();
    } else {
      if (this.pageCounter <= 1) {
        this.movies = this.rawMovieData.items.slice(0, this.itemsOnDisplay);
        console.log(
          this.movies,
          this.pageCounter,
          this.itemsOnDisplay + this.itemsOnDisplay
        );
      }

      if (this.pageCounter > 1) {
        this.pageCounter--;
        console.log(
          this.movies,
          this.pageCounter,
          this.pageCounter * this.itemsOnDisplay + this.itemsOnDisplay
        );

        // if(this.pageCounter===1)
        this.paginationBack();
      }
    }
  }

  // pageSlicer(operator){
  //   if (operator==='+')
  //   this.movies = this.rawMovieData.items.slice(
  //     this.pageCounter * this.itemsOnDisplay,
  //     this.pageCounter * this.itemsOnDisplay + this.itemsOnDisplay
  //   );
  // }

  paginationBack() {
    this.movies = this.rawMovieData.items.slice(
      this.pageCounter * this.itemsOnDisplay - this.itemsOnDisplay,
      this.pageCounter * this.itemsOnDisplay
    );
    console.log(
      this.movies,
      this.pageCounter,
      this.pageCounter * this.itemsOnDisplay,
      this.pageCounter * this.itemsOnDisplay + this.itemsOnDisplay
    );
  }
  paginationForth() {
    if (
      //test if there are less items left in the array than 10
      this.pageCounter * this.itemsOnDisplay <
      this.rawMovieData.items.length
    ) {
      this.movies = this.rawMovieData.items.slice(
        this.pageCounter * this.itemsOnDisplay - this.itemsOnDisplay,
        this.pageCounter * this.itemsOnDisplay
      );
      console.log(this.movies, this.pageCounter);
    } else {
      let emptyCheck = this.rawMovieData.items.slice(
        this.pageCounter * this.itemsOnDisplay - this.itemsOnDisplay,
        this.rawMovieData.items.length
      );
      if (emptyCheck[0].rank) {
        this.movies = emptyCheck;
        console.log(
          this.movies,
          this.pageCounter,
          this.itemsOnDisplay + this.itemsOnDisplay
        );

        this.pageCounter--;
        console.log(
          this.movies,
          this.pageCounter,
          this.itemsOnDisplay + this.itemsOnDisplay
        );
      }
    }
  }
}
