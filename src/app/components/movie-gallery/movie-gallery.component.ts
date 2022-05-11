import { Component, OnInit, Input } from '@angular/core';
import { movieService } from 'src/app/services/movie-items.service';
@Component({
  selector: 'app-movie-gallery',
  templateUrl: './movie-gallery.component.html',
  styleUrls: ['./movie-gallery.component.css'],
})
export class MovieGalleryComponent implements OnInit {
  atEnd: boolean = false;
  showPagination: boolean = false;
  searchWord: string = '';
  displayInput = false;
  itemsOnDisplay: number = 10;
  pageCounter: number = 1;
  rawMovieData: any = [];
  movies: any = [
    {
      id: 'tt9419884',
      rank: '1',
      rankUpDown: '+5',
      title: 'Doctor Strange in the Multiverse of Madness',
      fullTitle: 'Doctor Strange in the Multiverse of Madness (2022)',
      year: '2022',
      image:
        'https://imdb-api.com/images/original/MV5BNWM0ZGJlMzMtZmYwMi00NzI3LTgzMzMtNjMzNjliNDRmZmFlXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_Ratio0.6716_AL_.jpg',
      crew: 'Sam Raimi (dir.), Benedict Cumberbatch, Elizabeth Olsen',
      imDbRating: '7.5',
      imDbRatingCount: '109225',
    },
    {
      id: 'tt1877830',
      rank: '2',
      rankUpDown: '-1',
      title: 'The Batman',
      fullTitle: 'The Batman (2022)',
      year: '2022',
      image:
        'https://imdb-api.com/images/original/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_Ratio0.6716_AL_.jpg',
      crew: 'Matt Reeves (dir.), Robert Pattinson, Zoë Kravitz',
      imDbRating: '8.0',
      imDbRatingCount: '455563',
    },
    {
      id: 'tt11138512',
      rank: '3',
      rankUpDown: '-1',
      title: 'The Northman',
      fullTitle: 'The Northman (2022)',
      year: '2022',
      image:
        'https://imdb-api.com/images/original/MV5BMzVlMmY2NTctODgwOC00NDMzLWEzMWYtM2RiYmIyNTNhMTI0XkEyXkFqcGdeQXVyNTAzNzgwNTg@._V1_Ratio0.6716_AL_.jpg',
      crew: 'Robert Eggers (dir.), Alexander Skarsgård, Nicole Kidman',
      imDbRating: '7.8',
      imDbRatingCount: '48640',
    },
    {
      id: 'tt12996154',
      rank: '4',
      rankUpDown: '-1',
      title: '365 Days: This Day',
      fullTitle: '365 Days: This Day (2022)',
      year: '2022',
      image:
        'https://imdb-api.com/images/original/MV5BYjY2NzUxNjgtNjJhNy00NTA4LTlmNzItYzQ4MDdjNWYxZjkwXkEyXkFqcGdeQXVyMTEwMTY3NDI@._V1_Ratio0.7015_AL_.jpg',
      crew: 'Barbara Bialowas (dir.), Anna-Maria Sieklucka, Michele Morrone',
      imDbRating: '2.5',
      imDbRatingCount: '10687',
    },
    {
      id: 'tt10731256',
      rank: '5',
      rankUpDown: '+22',
      title: "Don't Worry Darling",
      fullTitle: "Don't Worry Darling (2022)",
      year: '2022',
      image:
        'https://imdb-api.com/images/original/MV5BOWIyNDA2YjEtZGNhNy00YjY1LTk5ZDctNmEyMzQxZTQyYjAwXkEyXkFqcGdeQXVyMTIzNDk1MDYz._V1_Ratio0.6716_AL_.jpg',
      crew: 'Olivia Wilde (dir.), Florence Pugh, Olivia Wilde',
      imDbRating: '',
      imDbRatingCount: '0',
    },
    {
      id: 'tt6710474',
      rank: '6',
      rankUpDown: '-1',
      title: 'Everything Everywhere All at Once',
      fullTitle: 'Everything Everywhere All at Once (2022)',
      year: '2022',
      image:
        'https://imdb-api.com/images/original/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_Ratio0.6716_AL_.jpg',
      crew: 'Dan Kwan (dir.), Michelle Yeoh, Stephanie Hsu',
      imDbRating: '8.8',
      imDbRatingCount: '37076',
    },
  ];
  results: boolean = true;
  moreDetails: boolean = false;
  selectedID: any = [];
  // inputSearch: string = '';

  constructor(private movieData: movieService) {
    // this.search = 'two way Binding';
  }
  ngOnInit(): void {}

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
    // this.moreDetails = !this.moreDetails;
  }
  searchApi() {
    this.movies = this.movieData.getPopularMovies().subscribe((data: any) => {
      this.rawMovieData = data;
      this.showPagination = true;
      this.movies = this.rawMovieData.items.slice(0, this.itemsOnDisplay);
    });
  }

  searchOneMovie() {
    this.movies = this.movieData
      .getOneMovie(this.searchWord)
      .subscribe((data: any) => {
        console.log(data);
        this.movies = data.results;
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
