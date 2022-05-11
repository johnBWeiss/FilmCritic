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
    {
      id: 'tt10886166',
      rank: '7',
      rankUpDown: '+2',
      title: '365 Days',
      fullTitle: '365 Days (2020)',
      year: '2020',
      image:
        'https://imdb-api.com/images/original/MV5BMDdhYzNkOWQtYWNlNi00NDdjLWJlZDMtMjJjZDYyNjAxM2U1XkEyXkFqcGdeQXVyMTQyMTMwOTk0._V1_Ratio0.7313_AL_.jpg',
      crew: 'Barbara Bialowas (dir.), Anna-Maria Sieklucka, Michele Morrone',
      imDbRating: '3.3',
      imDbRatingCount: '80004',
    },
    {
      id: 'tt8115900',
      rank: '8',
      rankUpDown: '+8',
      title: 'The Bad Guys',
      fullTitle: 'The Bad Guys (2022)',
      year: '2022',
      image:
        'https://imdb-api.com/images/original/MV5BMDhkYmU0MzctMWEzNy00ODg1LWI3ZjAtMGZlZjkzNWVmMzVjXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_Ratio0.6716_AL_.jpg',
      crew: 'Pierre Perifel (dir.), Sam Rockwell, Marc Maron',
      imDbRating: '6.9',
      imDbRatingCount: '10673',
    },
    {
      id: 'tt13560574',
      rank: '9',
      rankUpDown: '+1',
      title: 'X',
      fullTitle: 'X (2022)',
      year: '2022',
      image:
        'https://imdb-api.com/images/original/MV5BMTJiMmE5YWItOWZjYS00YTg0LWE0MTYtMzg2ZTY4YjNkNDEzXkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_Ratio0.7910_AL_.jpg',
      crew: 'Ti West (dir.), Mia Goth, Jenna Ortega',
      imDbRating: '6.7',
      imDbRatingCount: '35055',
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

  searchOneMovie() {
    this.movies = this.movieData.getOneMovie().subscribe((data: any) => {
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
