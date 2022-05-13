import { Component, OnInit, Input } from '@angular/core';
import { movieService } from 'src/app/services/movie-items.service';

@Component({
  selector: 'app-movie-gallery',
  templateUrl: './movie-gallery.component.html',
  styleUrls: ['./movie-gallery.component.css'],
})
export class MovieGalleryComponent implements OnInit {
  //this block of code is used for displaying ng-if elements
  errorModal: boolean = false;
  isLoaded: boolean = true;
  showPagination: boolean = false;
  displayInput: boolean = false;
  showSpinner: boolean = false;

  //this block is the core logic of the app
  atEnd: boolean = false;
  searchWord: string = '';
  itemsOnDisplay: number = 10;
  formerItemsOnDisplay: number = 10;
  pageCounter: number = 1;
  rawMovieData: any = {};
  movies: any = [];
  results: boolean = true;
  moreDetails: boolean = false;
  selectedID: any = [];

  constructor(private movieData: movieService) {}
  ngOnInit(): void {}

  resetScreenForNewApiCall() {
    this.isLoaded = false;
    this.showPagination = false;
    this.displayInput = false;
    this.errorModal = false;
    this.displayInput = false;
    this.showSpinner = true;
  }

  apiCallRecieved() {
    this.showSpinner = false;
    this.showPagination = true;
    this.isLoaded = true;
    this.errorModal = false;
  }

  scrollUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showInput() {
    this.displayInput = !this.displayInput;
  }

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
  }

  searchApi() {
    this.resetScreenForNewApiCall();
    this.movieData.getPopularMovies().subscribe(
      (data: any) => {
        this.apiCallRecieved();
        this.rawMovieData = data;
        this.movies = this.rawMovieData.items.slice(
          0,
          Number(this.itemsOnDisplay)
        );
      },
      (res) => {
        this.showSpinner = false;
        console.log('HTTP response error', res);
        this.errorModal = true;
        setTimeout(() => {
          this.errorModal = false;
        }, 3000);
      },
      () => console.log('HTTP request completed.')
    );
  }

  searchOneMovie() {
    this.resetScreenForNewApiCall();

    this.movies = this.movieData.getOneMovie(this.searchWord).subscribe(
      (data: any) => {
        this.apiCallRecieved();

        this.movies = data.results;
        this.rawMovieData.items = data.results;
      },
      (res) => {
        (this.showSpinner = false),
          console.log('HTTP response', res),
          (this.errorModal = true);
        setTimeout(() => {
          this.errorModal = false;
        }, 3000);
      },
      () => console.log('HTTP request completed.')
    );
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
    this.formerItemsOnDisplay = Number(this.formerItemsOnDisplay);
    this.itemsOnDisplay = Number(this.itemsOnDisplay);
    let basePage =
      this.pageCounter * this.formerItemsOnDisplay - this.formerItemsOnDisplay;
    this.movies = this.rawMovieData.items.slice(
      basePage,
      basePage + this.itemsOnDisplay
    );

    this.formerItemsOnDisplay = this.itemsOnDisplay;
  }
}
