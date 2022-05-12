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
  // rawMovieData: any = {};
  // movies: any = [];
  rawMovieData: any = {
    items: [
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
        imDbRatingCount: '117127',
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
        imDbRatingCount: '457552',
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
        imDbRatingCount: '49652',
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
        imDbRatingCount: '10980',
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
        imDbRatingCount: '37825',
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
        imDbRatingCount: '80180',
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
        imDbRatingCount: '11073',
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
        imDbRatingCount: '35377',
      },
      {
        id: 'tt0376136',
        rank: '10',
        rankUpDown: '+9',
        title: 'The Rum Diary',
        fullTitle: 'The Rum Diary (2011)',
        year: '2011',
        image:
          'https://imdb-api.com/images/original/MV5BMTM5ODA4MjYxM15BMl5BanBnXkFtZTcwMTM3NTE5Ng@@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Bruce Robinson (dir.), Johnny Depp, Giovanni Ribisi',
        imDbRating: '6.1',
        imDbRatingCount: '102977',
      },
      {
        id: 'tt1464335',
        rank: '11',
        rankUpDown: '-7',
        title: 'Uncharted',
        fullTitle: 'Uncharted (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BMWEwNjhkYzYtNjgzYy00YTY2LThjYWYtYzViMGJkZTI4Y2MyXkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Ruben Fleischer (dir.), Tom Holland, Mark Wahlberg',
        imDbRating: '6.4',
        imDbRatingCount: '103561',
      },
      {
        id: 'tt1745960',
        rank: '12',
        rankUpDown: '+17',
        title: 'Top Gun: Maverick',
        fullTitle: 'Top Gun: Maverick (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BMmIwZDMyYWUtNTU0ZS00ODJhLTg2ZmEtMTk5ZmYzODcxODYxXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_Ratio0.6716_AL_.jpg',
        crew: 'Joseph Kosinski (dir.), Tom Cruise, Jennifer Connelly',
        imDbRating: '',
        imDbRatingCount: '0',
      },
      {
        id: 'tt7657566',
        rank: '13',
        rankUpDown: '+1',
        title: 'Death on the Nile',
        fullTitle: 'Death on the Nile (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BNjI4ZTQ1OTYtNTI0Yi00M2EyLThiNjMtMzk1MmZlOWMyMDQwXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_Ratio0.6716_AL_.jpg',
        crew: 'Kenneth Branagh (dir.), Tom Bateman, Annette Bening',
        imDbRating: '6.3',
        imDbRatingCount: '101799',
      },
      {
        id: 'tt10872600',
        rank: '14',
        rankUpDown: '+3',
        title: 'Spider-Man: No Way Home',
        fullTitle: 'Spider-Man: No Way Home (2021)',
        year: '2021',
        image:
          'https://imdb-api.com/images/original/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Jon Watts (dir.), Tom Holland, Zendaya',
        imDbRating: '8.4',
        imDbRatingCount: '624518',
      },
      {
        id: 'tt12412888',
        rank: '15',
        rankUpDown: '+5',
        title: 'Sonic the Hedgehog 2',
        fullTitle: 'Sonic the Hedgehog 2 (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BYzA0NGY2NGItNTg2ZS00ZWRlLTg4ZDctYzQ5Zjg3NGE2ZDNlXkEyXkFqcGdeQXVyMTQyMTMwOTk0._V1_Ratio0.6716_AL_.jpg',
        crew: 'Jeff Fowler (dir.), James Marsden, Jim Carrey',
        imDbRating: '6.7',
        imDbRatingCount: '28513',
      },
      {
        id: 'tt11291274',
        rank: '16',
        rankUpDown: '-8',
        title: 'The Unbearable Weight of Massive Talent',
        fullTitle: 'The Unbearable Weight of Massive Talent (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BNDM2ODNiMWItOWRkNS00ODE3LWE2OGYtNTZkMDJkOWI1ODMxXkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Tom Gormican (dir.), Nicolas Cage, Pedro Pascal',
        imDbRating: '7.5',
        imDbRatingCount: '17393',
      },
      {
        id: 'tt4123432',
        rank: '17',
        rankUpDown: '-5',
        title: 'Fantastic Beasts: The Secrets of Dumbledore',
        fullTitle: 'Fantastic Beasts: The Secrets of Dumbledore (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BZGQ1NjQyNDMtNzFlZS00ZGIzLTliMWUtNGJkMGMzNTBjNDg0XkEyXkFqcGdeQXVyMTE1NDI5MDQx._V1_Ratio0.6716_AL_.jpg',
        crew: 'David Yates (dir.), Eddie Redmayne, Jude Law',
        imDbRating: '6.5',
        imDbRatingCount: '51628',
      },
      {
        id: 'tt8041270',
        rank: '18',
        rankUpDown: '0',
        title: 'Jurassic World Dominion',
        fullTitle: 'Jurassic World Dominion (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BZmQ1NDZjMTktMjFhZC00ZGY5LWEyMTMtNDhkOWM4NmMyZjI0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Colin Trevorrow (dir.), Chris Pratt, Bryce Dallas Howard',
        imDbRating: '',
        imDbRatingCount: '0',
      },
      {
        id: 'tt1630029',
        rank: '19',
        rankUpDown: '+5',
        title: 'Avatar: The Way of Water',
        fullTitle: 'Avatar: The Way of Water (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BMWFmYmRiYzMtMTQ4YS00NjA5LTliYTgtMmM3OTc4OGY3MTFkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_Ratio0.7910_AL_.jpg',
        crew: 'James Cameron (dir.), Michelle Yeoh, Zoe Saldana',
        imDbRating: '',
        imDbRatingCount: '0',
      },
      {
        id: 'tt0068646',
        rank: '20',
        rankUpDown: '+25',
        title: 'The Godfather',
        fullTitle: 'The Godfather (1972)',
        year: '1972',
        image:
          'https://imdb-api.com/images/original/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.7015_AL_.jpg',
        crew: 'Francis Ford Coppola (dir.), Marlon Brando, Al Pacino',
        imDbRating: '9.2',
        imDbRatingCount: '1780508',
      },
      {
        id: 'tt4998632',
        rank: '21',
        rankUpDown: '-8',
        title: 'Ambulance',
        fullTitle: 'Ambulance (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BYjUyN2VlZGEtNGEyZC00YjViLTgwYmQtZDJiM2FlOTU3Mjg2XkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Michael Bay (dir.), Jake Gyllenhaal, Yahya Abdul-Mateen II',
        imDbRating: '6.1',
        imDbRatingCount: '32923',
      },
      {
        id: 'tt10648342',
        rank: '22',
        rankUpDown: '-15',
        title: 'Thor: Love and Thunder',
        fullTitle: 'Thor: Love and Thunder (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BMzJjZWYzNTctODgwOS00OGNiLTg4MjktMDlmNWUxNjczMzljXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_Ratio0.6716_AL_.jpg',
        crew: 'Taika Waititi (dir.), Pom Klementieff, Taika Waititi',
        imDbRating: '',
        imDbRatingCount: '0',
      },
      {
        id: 'tt11460992',
        rank: '23',
        rankUpDown: '+119',
        title: 'Runway 34',
        fullTitle: 'Runway 34 (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BN2YzNjU4MTYtMzY5OS00ODg0LTkxMTUtNjg0YjRkYzI5ZWJjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_Ratio0.7313_AL_.jpg',
        crew: 'Ajay Devgn (dir.), Ajay Devgn, Amitabh Bachchan',
        imDbRating: '8.0',
        imDbRatingCount: '15021',
      },
      {
        id: 'tt1211837',
        rank: '24',
        rankUpDown: '+62',
        title: 'Doctor Strange',
        fullTitle: 'Doctor Strange (2016)',
        year: '2016',
        image:
          'https://imdb-api.com/images/original/MV5BNjgwNzAzNjk1Nl5BMl5BanBnXkFtZTgwMzQ2NjI1OTE@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Scott Derrickson (dir.), Benedict Cumberbatch, Chiwetel Ejiofor',
        imDbRating: '7.5',
        imDbRatingCount: '698375',
      },
      {
        id: 'tt10698680',
        rank: '25',
        rankUpDown: '-10',
        title: 'K.G.F: Chapter 2',
        fullTitle: 'K.G.F: Chapter 2 (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BMjMwMDgyOGQtMWZjNC00MDUwLTllZDYtZWM3NDBmN2YzNGZmXkEyXkFqcGdeQXVyMTQzNjkzMzEw._V1_Ratio0.6716_AL_.jpg',
        crew: 'Prashanth Neel (dir.), Yash, Sanjay Dutt',
        imDbRating: '8.9',
        imDbRatingCount: '92077',
      },
      {
        id: 'tt1477834',
        rank: '26',
        rankUpDown: '-4',
        title: 'Aquaman',
        fullTitle: 'Aquaman (2018)',
        year: '2018',
        image:
          'https://imdb-api.com/images/original/MV5BOTk5ODg0OTU5M15BMl5BanBnXkFtZTgwMDQ3MDY3NjM@._V1_Ratio0.6716_AL_.jpg',
        crew: 'James Wan (dir.), Jason Momoa, Amber Heard',
        imDbRating: '6.8',
        imDbRatingCount: '445397',
      },
      {
        id: 'tt8367814',
        rank: '27',
        rankUpDown: '+44',
        title: 'The Gentlemen',
        fullTitle: 'The Gentlemen (2019)',
        year: '2019',
        image:
          'https://imdb-api.com/images/original/MV5BMTlkMmVmYjktYTc2NC00ZGZjLWEyOWUtMjc2MDMwMjQwOTA5XkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Guy Ritchie (dir.), Matthew McConaughey, Charlie Hunnam',
        imDbRating: '7.8',
        imDbRatingCount: '314226',
      },
      {
        id: 'tt11703710',
        rank: '28',
        rankUpDown: '+4',
        title: 'Downton Abbey: A New Era',
        fullTitle: 'Downton Abbey: A New Era (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BZDdjZjM1YWItNWRmOS00OTEzLWJmYjAtOGQzNTAyNmEwNDhjXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Simon Curtis (dir.), Hugh Bonneville, Jim Carter',
        imDbRating: '7.6',
        imDbRatingCount: '2704',
      },
      {
        id: 'tt15096128',
        rank: '29',
        rankUpDown: '+39',
        title: 'Crush',
        fullTitle: 'Crush (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BOTNhNzRlZjctZWVlMC00ODU3LWFmOTgtNDI1ZGM0N2IxY2EwXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_Ratio0.6716_AL_.jpg',
        crew: "Sammi Cohen (dir.), Rowan Blanchard, Auli'i Cravalho",
        imDbRating: '6.1',
        imDbRatingCount: '2270',
      },
      {
        id: 'tt13320622',
        rank: '30',
        rankUpDown: '-9',
        title: 'The Lost City',
        fullTitle: 'The Lost City (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BMmIwYzFhODAtY2I1YS00ZDdmLTkyYWQtZjI5NDIwMDc2MjEyXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Aaron Nee (dir.), Sandra Bullock, Channing Tatum',
        imDbRating: '6.4',
        imDbRatingCount: '25447',
      },
      {
        id: 'tt1160419',
        rank: '31',
        rankUpDown: '-8',
        title: 'Dune',
        fullTitle: 'Dune (2021)',
        year: '2021',
        image:
          'https://imdb-api.com/images/original/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Denis Villeneuve (dir.), Timothée Chalamet, Rebecca Ferguson',
        imDbRating: '8.1',
        imDbRatingCount: '563191',
      },
      {
        id: 'tt7144666',
        rank: '32',
        rankUpDown: '-21',
        title: 'The Black Phone',
        fullTitle: 'The Black Phone (2021)',
        year: '2021',
        image:
          'https://imdb-api.com/images/original/MV5BOWVmNTBiYTUtZWQ3Yi00ZDlhLTgyYjUtNzBhZjM3YjRiNGRkXkEyXkFqcGdeQXVyNzYyOTM1ODI@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Scott Derrickson (dir.), Ethan Hawke, Jeremy Davies',
        imDbRating: '7.4',
        imDbRatingCount: '820',
      },
      {
        id: 'tt0092099',
        rank: '33',
        rankUpDown: '+31',
        title: 'Top Gun',
        fullTitle: 'Top Gun (1986)',
        year: '1986',
        image:
          'https://imdb-api.com/images/original/MV5BYTgzYTg5NTMtMjFmMy00MWIxLWEwYTQtN2UyMzY3NDIzOTRjL2ltYWdlXkEyXkFqcGdeQXVyNjQzNDI3NzY@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Tony Scott (dir.), Tom Cruise, Tim Robbins',
        imDbRating: '6.9',
        imDbRatingCount: '329617',
      },
      {
        id: 'tt5834426',
        rank: '34',
        rankUpDown: '-1',
        title: 'Moonfall',
        fullTitle: 'Moonfall (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BZjk0OWZiN2ItNmQ2YS00NTJmLTg0MjItNzM4NzBkMWM1ZTRlXkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_Ratio0.7015_AL_.jpg',
        crew: 'Roland Emmerich (dir.), Halle Berry, Patrick Wilson',
        imDbRating: '5.2',
        imDbRatingCount: '43963',
      },
      {
        id: 'tt5108870',
        rank: '35',
        rankUpDown: '-7',
        title: 'Morbius',
        fullTitle: 'Morbius (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BNTA3N2Q0ZTAtODJjNy00MmQzLWJlMmItOGFmNDI0ODgxN2QwXkEyXkFqcGdeQXVyMTM0NTUzNDIy._V1_Ratio0.6716_AL_.jpg',
        crew: 'Daniel Espinosa (dir.), Jared Leto, Matt Smith',
        imDbRating: '5.1',
        imDbRatingCount: '40788',
      },
      {
        id: 'tt14114802',
        rank: '36',
        rankUpDown: '-1',
        title: 'The Outfit',
        fullTitle: 'The Outfit (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BYWQ0NWUyMjktYjg4Yy00NmY3LTg2YzEtNWY5OTY5YTc2MjhjXkEyXkFqcGdeQXVyMTA2MDU0NjM5._V1_Ratio0.6716_AL_.jpg',
        crew: "Graham Moore (dir.), Zoey Deutch, Dylan O'Brien",
        imDbRating: '7.1',
        imDbRatingCount: '17484',
      },
      {
        id: 'tt0325980',
        rank: '37',
        rankUpDown: '+5',
        title: 'Pirates of the Caribbean: The Curse of the Black Pearl',
        fullTitle:
          'Pirates of the Caribbean: The Curse of the Black Pearl (2003)',
        year: '2003',
        image:
          'https://imdb-api.com/images/original/MV5BNGYyZGM5MGMtYTY2Ni00M2Y1LWIzNjQtYWUzM2VlNGVhMDNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Gore Verbinski (dir.), Johnny Depp, Geoffrey Rush',
        imDbRating: '8.0',
        imDbRatingCount: '1081796',
      },
      {
        id: 'tt11827628',
        rank: '38',
        rankUpDown: '+17',
        title: 'Memory',
        fullTitle: 'Memory (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BOGI5N2FhNzktZjZlNi00MmRjLWE1MmUtNjRlNzQyOGMzYjNhXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Martin Campbell (dir.), Liam Neeson, Monica Bellucci',
        imDbRating: '5.6',
        imDbRatingCount: '1119',
      },
      {
        id: 'tt18303004',
        rank: '39',
        rankUpDown: '2,589',
        title: 'Being Mortal',
        fullTitle: 'Being Mortal (2023)',
        year: '2023',
        image: 'https://imdb-api.com/images/original/nopicture.jpg',
        crew: 'Aziz Ansari (dir.), Keke Palmer, Bill Murray',
        imDbRating: '',
        imDbRatingCount: '0',
      },
      {
        id: 'tt8633478',
        rank: '40',
        rankUpDown: '+169',
        title: 'Run',
        fullTitle: 'Run (2020)',
        year: '2020',
        image:
          'https://imdb-api.com/images/original/MV5BZjdmZDlkMzItNTg0OS00MjAxLWE0ZTQtZjdhOWM1MTJkOTc0XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Aneesh Chaganty (dir.), Sarah Paulson, Kiera Allen',
        imDbRating: '6.7',
        imDbRatingCount: '69382',
      },
      {
        id: 'tt6467266',
        rank: '41',
        rankUpDown: '-1',
        title: 'Sing 2',
        fullTitle: 'Sing 2 (2021)',
        year: '2021',
        image:
          'https://imdb-api.com/images/original/MV5BMWRiZGQ1NDMtODQ2OS00MDlhLWJkZGYtM2ZmNjlhZThjOWRmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Garth Jennings (dir.), Matthew McConaughey, Reese Witherspoon',
        imDbRating: '7.4',
        imDbRatingCount: '47939',
      },
      {
        id: 'tt2382320',
        rank: '42',
        rankUpDown: '+7',
        title: 'No Time to Die',
        fullTitle: 'No Time to Die (2021)',
        year: '2021',
        image:
          'https://imdb-api.com/images/original/MV5BYWQ2NzQ1NjktMzNkNS00MGY1LTgwMmMtYTllYTI5YzNmMmE0XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Cary Joji Fukunaga (dir.), Daniel Craig, Ana de Armas',
        imDbRating: '7.3',
        imDbRatingCount: '350675',
      },
      {
        id: 'tt9242528',
        rank: '43',
        rankUpDown: '-18',
        title: 'The Survivor',
        fullTitle: 'The Survivor (2021)',
        year: '2021',
        image:
          'https://imdb-api.com/images/original/MV5BYWRlYjg0ZTUtYmZhOS00YWMxLWJhYWEtOTA3Y2MyMzg4ODg4XkEyXkFqcGdeQXVyMTAxOTI5MTY@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Barry Levinson (dir.), Ben Foster, Billy Magnussen',
        imDbRating: '6.8',
        imDbRatingCount: '1482',
      },
      {
        id: 'tt2463208',
        rank: '44',
        rankUpDown: '-7',
        title: 'The Adam Project',
        fullTitle: 'The Adam Project (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BOWM0YWMwMDQtMjE5NS00ZTIwLWE1NWEtODViMWZjMWI2OTU3XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_Ratio0.6716_AL_.jpg',
        crew: 'Shawn Levy (dir.), Ryan Reynolds, Walker Scobell',
        imDbRating: '6.7',
        imDbRatingCount: '156991',
      },
      {
        id: 'tt18563148',
        rank: '45',
        rankUpDown: '-1',
        title: 'Silverton Siege',
        fullTitle: 'Silverton Siege (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BNGI4ZWU1MWUtNWYzNS00OTFlLWJhYjItNjFhMGZkMWJlMzJjXkEyXkFqcGdeQXVyODcxODU0OTM@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Mandla Dube (dir.), Arnold Vosloo, Michelle Mosalakae',
        imDbRating: '6.1',
        imDbRatingCount: '2169',
      },
      {
        id: 'tt9032400',
        rank: '46',
        rankUpDown: '+7',
        title: 'Eternals',
        fullTitle: 'Eternals (2021)',
        year: '2021',
        image:
          'https://imdb-api.com/images/original/MV5BMTExZmVjY2ItYTAzYi00MDdlLWFlOWItNTJhMDRjMzQ5ZGY0XkEyXkFqcGdeQXVyODIyOTEyMzY@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Chloé Zhao (dir.), Gemma Chan, Richard Madden',
        imDbRating: '6.3',
        imDbRatingCount: '300886',
      },
      {
        id: 'tt8178634',
        rank: '47',
        rankUpDown: '-11',
        title: 'RRR',
        fullTitle: 'RRR (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyYTEtMDc5Y2E5ZjBmNTMzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_Ratio0.7313_AL_.jpg',
        crew: 'S.S. Rajamouli (dir.), N.T. Rama Rao Jr., Ram Charan',
        imDbRating: '8.4',
        imDbRatingCount: '63280',
      },
      {
        id: 'tt0810819',
        rank: '48',
        rankUpDown: '+157',
        title: 'The Danish Girl',
        fullTitle: 'The Danish Girl (2015)',
        year: '2015',
        image:
          'https://imdb-api.com/images/original/MV5BMjA0NjA4NjE2Nl5BMl5BanBnXkFtZTgwNzIxNTY2NjE@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Tom Hooper (dir.), Eddie Redmayne, Alicia Vikander',
        imDbRating: '7.1',
        imDbRatingCount: '181230',
      },
      {
        id: 'tt10366460',
        rank: '49',
        rankUpDown: '-15',
        title: 'CODA',
        fullTitle: 'CODA (2021)',
        year: '2021',
        image:
          'https://imdb-api.com/images/original/MV5BYzkyNzNiMDItMGU1Yy00NmEyLWE4N2ItMjkzMDZmMmVhNDU4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Sian Heder (dir.), Emilia Jones, Marlee Matlin',
        imDbRating: '8.0',
        imDbRatingCount: '107023',
      },
      {
        id: 'tt8097030',
        rank: '50',
        rankUpDown: '-12',
        title: 'Turning Red',
        fullTitle: 'Turning Red (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BOWYxZDMxYWUtNjNiZC00MDE1LWI2Y2QtNWZhNDAyMGY5ZjVhXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Domee Shi (dir.), Rosalie Chiang, Sandra Oh',
        imDbRating: '7.0',
        imDbRatingCount: '90626',
      },
      {
        id: 'tt7097896',
        rank: '51',
        rankUpDown: '+18',
        title: 'Venom: Let There Be Carnage',
        fullTitle: 'Venom: Let There Be Carnage (2021)',
        year: '2021',
        image:
          'https://imdb-api.com/images/original/MV5BYTc3ZTAwYTgtMmM4ZS00MDRiLWI2Y2EtYmRiZmE0YjkzMGY1XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Andy Serkis (dir.), Tom Hardy, Woody Harrelson',
        imDbRating: '6.0',
        imDbRatingCount: '198239',
      },
      {
        id: 'tt2953050',
        rank: '52',
        rankUpDown: '-1',
        title: 'Encanto',
        fullTitle: 'Encanto (2021)',
        year: '2021',
        image:
          'https://imdb-api.com/images/original/MV5BNjE5NzA4ZDctOTJkZi00NzM0LTkwOTYtMDI4MmNkMzIxODhkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Jared Bush (dir.), Stephanie Beatriz, María Cecilia Botero',
        imDbRating: '7.2',
        imDbRatingCount: '194502',
      },
      {
        id: 'tt10083340',
        rank: '53',
        rankUpDown: '+53',
        title: 'Gangubai Kathiawadi',
        fullTitle: 'Gangubai Kathiawadi (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BN2M4NDM2NDItMzgzNy00OWRiLThhNjEtZDA2OWMyNTcwYzRjXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_Ratio0.7910_AL_.jpg',
        crew: 'Sanjay Leela Bhansali (dir.), Alia Bhatt, Shantanu Maheshwari',
        imDbRating: '7.0',
        imDbRatingCount: '44002',
      },
      {
        id: 'tt6856242',
        rank: '54',
        rankUpDown: '-6',
        title: "The King's Man",
        fullTitle: "The King's Man (2021)",
        year: '2021',
        image:
          'https://imdb-api.com/images/original/MV5BMDEzZDY2ZDktNTlmOS00NThjLThkNTEtMjE5MzI5NWEwZmRjXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Matthew Vaughn (dir.), Ralph Fiennes, Gemma Arterton',
        imDbRating: '6.3',
        imDbRatingCount: '122506',
      },
      {
        id: 'tt12141112',
        rank: '55',
        rankUpDown: '-24',
        title: 'Metal Lords',
        fullTitle: 'Metal Lords (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BNjJjMzI1ZDctMDhmMy00Nzk2LTg5ZjgtNGIyN2QyNDQwMDU5XkEyXkFqcGdeQXVyMTMyNzMxNTcw._V1_Ratio0.6716_AL_.jpg',
        crew: 'Peter Sollett (dir.), Jaeden Martell, Adrian Greensmith',
        imDbRating: '6.7',
        imDbRatingCount: '19779',
      },
      {
        id: 'tt13918550',
        rank: '56',
        rankUpDown: '+892',
        title: 'Black Site',
        fullTitle: 'Black Site (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BOWZiMjVmYTctYjlkOS00ZjNlLTgwN2ItMWU0MTQyYzFjMzc4XkEyXkFqcGdeQXVyMTM2ODg1ODU0._V1_Ratio0.7612_AL_.jpg',
        crew: 'Sophia Banks (dir.), Michelle Monaghan, Jason Clarke',
        imDbRating: '4.4',
        imDbRatingCount: '526',
      },
      {
        id: 'tt4123430',
        rank: '57',
        rankUpDown: '-16',
        title: 'Fantastic Beasts: The Crimes of Grindelwald',
        fullTitle: 'Fantastic Beasts: The Crimes of Grindelwald (2018)',
        year: '2018',
        image:
          'https://imdb-api.com/images/original/MV5BYWVlMDI5N2UtZTIyMC00NjZkLWI5Y2QtODM5NGE5MzA0NmVjXkEyXkFqcGdeQXVyNzU3NjUxMzE@._V1_Ratio0.6716_AL_.jpg',
        crew: 'David Yates (dir.), Eddie Redmayne, Katherine Waterston',
        imDbRating: '6.5',
        imDbRatingCount: '266944',
      },
      {
        id: 'tt7740496',
        rank: '58',
        rankUpDown: '-1',
        title: 'Nightmare Alley',
        fullTitle: 'Nightmare Alley (2021)',
        year: '2021',
        image:
          'https://imdb-api.com/images/original/MV5BOTI4NDhhNGEtZjQxZC00ZTRmLThmZTctOGJmY2ZlOTc0ZGY0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Guillermo del Toro (dir.), Bradley Cooper, Cate Blanchett',
        imDbRating: '7.1',
        imDbRatingCount: '119900',
      },
      {
        id: 'tt1273221',
        rank: '59',
        rankUpDown: '+42',
        title: 'London Fields',
        fullTitle: 'London Fields (2018)',
        year: '2018',
        image:
          'https://imdb-api.com/images/original/MV5BYjMwYWNiN2EtMWNkMS00MDU5LThiMGMtOTk5NTQzMjQ4OTkwXkEyXkFqcGdeQXVyNDExMzMxNjE@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Mathew Cullen (dir.), Amber Heard, Theo James',
        imDbRating: '3.9',
        imDbRatingCount: '9817',
      },
      {
        id: 'tt1790809',
        rank: '60',
        rankUpDown: '+10',
        title: 'Pirates of the Caribbean: Dead Men Tell No Tales',
        fullTitle: 'Pirates of the Caribbean: Dead Men Tell No Tales (2017)',
        year: '2017',
        image:
          'https://imdb-api.com/images/original/MV5BMTYyMTcxNzc5M15BMl5BanBnXkFtZTgwOTg2ODE2MTI@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Joachim Rønning (dir.), Johnny Depp, Geoffrey Rush',
        imDbRating: '6.5',
        imDbRatingCount: '296832',
      },
      {
        id: 'tt1798632',
        rank: '61',
        rankUpDown: '+35',
        title: 'Firestarter',
        fullTitle: 'Firestarter (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BMWIzNzA4MmUtYTIzNy00Y2Q5LWIyM2YtZGRiYzM0ZWQzOTU2XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Keith Thomas (dir.), Zac Efron, Ryan Kiera Armstrong',
        imDbRating: '',
        imDbRatingCount: '0',
      },
      {
        id: 'tt4154796',
        rank: '62',
        rankUpDown: '+19',
        title: 'Avengers: Endgame',
        fullTitle: 'Avengers: Endgame (2019)',
        year: '2019',
        image:
          'https://imdb-api.com/images/original/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Anthony Russo (dir.), Robert Downey Jr., Chris Evans',
        imDbRating: '8.4',
        imDbRatingCount: '1049744',
      },
      {
        id: 'tt3706352',
        rank: '63',
        rankUpDown: '-24',
        title: 'All the Old Knives',
        fullTitle: 'All the Old Knives (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BNTZhNDM0MGItYjIwYS00NTMzLWIxYmUtZjIwM2Q4NDhjY2EyXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_Ratio0.6716_AL_.jpg',
        crew: 'Janus Metz (dir.), Goksin Erdemli, Kasia Madera',
        imDbRating: '6.1',
        imDbRatingCount: '14764',
      },
      {
        id: 'tt3183660',
        rank: '64',
        rankUpDown: '-2',
        title: 'Fantastic Beasts and Where to Find Them',
        fullTitle: 'Fantastic Beasts and Where to Find Them (2016)',
        year: '2016',
        image:
          'https://imdb-api.com/images/original/MV5BMjMxOTM1OTI4MV5BMl5BanBnXkFtZTgwODE5OTYxMDI@._V1_Ratio0.6716_AL_.jpg',
        crew: 'David Yates (dir.), Eddie Redmayne, Katherine Waterston',
        imDbRating: '7.2',
        imDbRatingCount: '459492',
      },
      {
        id: 'tt11271038',
        rank: '65',
        rankUpDown: '+17',
        title: 'Licorice Pizza',
        fullTitle: 'Licorice Pizza (2021)',
        year: '2021',
        image:
          'https://imdb-api.com/images/original/MV5BYjkwMzIxYzMtOTVkMS00NDQxLThkMjItNzgxN2RiNjdlNTliXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Paul Thomas Anderson (dir.), Alana Haim, Cooper Hoffman',
        imDbRating: '7.3',
        imDbRatingCount: '80095',
      },
      {
        id: 'tt2180339',
        rank: '66',
        rankUpDown: '-8',
        title: 'Deep Water',
        fullTitle: 'Deep Water (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BNTE1M2NjNDgtYjQ2Ny00YTMzLWJiYWQtMTdmM2Q2YjA1MDg1XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Adrian Lyne (dir.), Ben Affleck, Ana de Armas',
        imDbRating: '5.4',
        imDbRatingCount: '34531',
      },
      {
        id: 'tt0468569',
        rank: '67',
        rankUpDown: '-21',
        title: 'The Dark Knight',
        fullTitle: 'The Dark Knight (2008)',
        year: '2008',
        image:
          'https://imdb-api.com/images/original/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Christopher Nolan (dir.), Christian Bale, Heath Ledger',
        imDbRating: '9.0',
        imDbRatingCount: '2555448',
      },
      {
        id: 'tt3774694',
        rank: '68',
        rankUpDown: '+10',
        title: 'Love',
        fullTitle: 'Love (2015)',
        year: '2015',
        image:
          'https://imdb-api.com/images/original/MV5BMTQzNDUwODk5NF5BMl5BanBnXkFtZTgwNzA0MDQ2NTE@._V1_Ratio0.7015_AL_.jpg',
        crew: 'Gaspar Noé (dir.), Aomi Muyock, Karl Glusman',
        imDbRating: '6.0',
        imDbRatingCount: '56850',
      },
      {
        id: 'tt6334354',
        rank: '69',
        rankUpDown: '+21',
        title: 'The Suicide Squad',
        fullTitle: 'The Suicide Squad (2021)',
        year: '2021',
        image:
          'https://imdb-api.com/images/original/MV5BMWU4NDQ2NjEtNjhkOS00Y2MwLWJkODItZmJhZGE0MDU1OWM4XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_Ratio0.6716_AL_.jpg',
        crew: 'James Gunn (dir.), Margot Robbie, Idris Elba',
        imDbRating: '7.2',
        imDbRatingCount: '327295',
      },
      {
        id: 'tt14439896',
        rank: '70',
        rankUpDown: '-27',
        title: 'Father Stu',
        fullTitle: 'Father Stu (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BNGYwOTI1MTUtYmY0Mi00OTAxLTkwNDEtOTI5YTkyZTVhN2JiXkEyXkFqcGdeQXVyMTAxNDE3MTE5._V1_Ratio0.7910_AL_.jpg',
        crew: 'Rosalind Ross (dir.), Mark Wahlberg, Mel Gibson',
        imDbRating: '6.9',
        imDbRatingCount: '2607',
      },
      {
        id: 'tt17076046',
        rank: '71',
        rankUpDown: '5,627',
        title: 'Weird: The Al Yankovic Story',
        fullTitle: 'Weird: The Al Yankovic Story (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BNzFhN2JmYTMtYmM1NC00MzJmLWE1ZjItY2Y4MGU3MWRjNzhmXkEyXkFqcGdeQXVyNjYwMzM1MjM@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Eric Appel (dir.), Daniel Radcliffe, Evan Rachel Wood',
        imDbRating: '',
        imDbRatingCount: '0',
      },
      {
        id: 'tt3704428',
        rank: '72',
        rankUpDown: '+88',
        title: 'Elvis',
        fullTitle: 'Elvis (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BNjhiODE0ZjktYzVhYS00ODRlLTkwZjYtYjRlNjg5YzI1MzZlXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Baz Luhrmann (dir.), Tom Hanks, Austin Butler',
        imDbRating: '',
        imDbRatingCount: '0',
      },
      {
        id: 'tt11245972',
        rank: '73',
        rankUpDown: '-12',
        title: 'Scream',
        fullTitle: 'Scream (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BYjExYTcwYmYtMWY2Zi00MGJlLTk3YjUtZTU1Zjg4MDc0Y2FjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Matt Bettinelli-Olpin (dir.), Neve Campbell, Courteney Cox',
        imDbRating: '6.4',
        imDbRatingCount: '87915',
      },
      {
        id: 'tt1517268',
        rank: '74',
        rankUpDown: '-48',
        title: 'Barbie',
        fullTitle: 'Barbie (2023)',
        year: '2023',
        image:
          'https://imdb-api.com/images/original/MV5BNTgyOGQyMGEtMGViOS00NDA3LWE3YzEtZjVmNGU3YTI5NTNjXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_Ratio0.7910_AL_.jpg',
        crew: 'Greta Gerwig (dir.), Emma Mackey, Margot Robbie',
        imDbRating: '',
        imDbRatingCount: '0',
      },
      {
        id: 'tt0499549',
        rank: '75',
        rankUpDown: '+14',
        title: 'Avatar',
        fullTitle: 'Avatar (2009)',
        year: '2009',
        image:
          'https://imdb-api.com/images/original/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_Ratio0.6716_AL_.jpg',
        crew: 'James Cameron (dir.), Sam Worthington, Zoe Saldana',
        imDbRating: '7.8',
        imDbRatingCount: '1193265',
      },
      {
        id: 'tt0111161',
        rank: '76',
        rankUpDown: '-13',
        title: 'The Shawshank Redemption',
        fullTitle: 'The Shawshank Redemption (1994)',
        year: '1994',
        image:
          'https://imdb-api.com/images/original/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Frank Darabont (dir.), Tim Robbins, Morgan Freeman',
        imDbRating: '9.3',
        imDbRatingCount: '2584977',
      },
      {
        id: 'tt11083552',
        rank: '77',
        rankUpDown: '-4',
        title: 'Wrath of Man',
        fullTitle: 'Wrath of Man (2021)',
        year: '2021',
        image:
          'https://imdb-api.com/images/original/MV5BNGVkOTlhOTktNjZiNS00NDg3LWIxMDAtZTY5Y2E0YjllN2IxXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Guy Ritchie (dir.), Jason Statham, Holt McCallany',
        imDbRating: '7.1',
        imDbRatingCount: '160872',
      },
      {
        id: 'tt3794354',
        rank: '78',
        rankUpDown: '+5',
        title: 'Sonic the Hedgehog',
        fullTitle: 'Sonic the Hedgehog (2020)',
        year: '2020',
        image:
          'https://imdb-api.com/images/original/MV5BNTdmNmI4MzQtZTAzNS00MjhjLWEzOGQtZjI1NDNjZjk4N2JjXkEyXkFqcGdeQXVyMTM0NTUzNDIy._V1_Ratio0.6716_AL_.jpg',
        crew: 'Jeff Fowler (dir.), Ben Schwartz, James Marsden',
        imDbRating: '6.5',
        imDbRatingCount: '127019',
      },
      {
        id: 'tt13403046',
        rank: '79',
        rankUpDown: '-13',
        title: 'Fresh',
        fullTitle: 'Fresh (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BZTgxMGQ2ZDctYWY4Yy00YTI4LWIxMmYtOWViMGI5ZDIwMmFiXkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_Ratio0.6716_AL_.jpg',
        crew: 'Mimi Cave (dir.), Daisy Edgar-Jones, Sebastian Stan',
        imDbRating: '6.7',
        imDbRatingCount: '36364',
      },
      {
        id: 'tt0144084',
        rank: '80',
        rankUpDown: '-1',
        title: 'American Psycho',
        fullTitle: 'American Psycho (2000)',
        year: '2000',
        image:
          'https://imdb-api.com/images/original/MV5BZTM2ZGJmNjQtN2UyOS00NjcxLWFjMDktMDE2NzMyNTZlZTBiXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Mary Harron (dir.), Christian Bale, Justin Theroux',
        imDbRating: '7.6',
        imDbRatingCount: '567815',
      },
      {
        id: 'tt4513678',
        rank: '81',
        rankUpDown: '-5',
        title: 'Ghostbusters: Afterlife',
        fullTitle: 'Ghostbusters: Afterlife (2021)',
        year: '2021',
        image:
          'https://imdb-api.com/images/original/MV5BMmZiMjdlN2UtYzdiZS00YjgxLTgyZGMtYzE4ZGU5NTlkNjhhXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_Ratio0.6716_AL_.jpg',
        crew: 'Jason Reitman (dir.), Carrie Coon, Paul Rudd',
        imDbRating: '7.1',
        imDbRatingCount: '144348',
      },
      {
        id: 'tt1879016',
        rank: '82',
        rankUpDown: '+17',
        title: 'Operation Mincemeat',
        fullTitle: 'Operation Mincemeat (2021)',
        year: '2021',
        image:
          'https://imdb-api.com/images/original/MV5BOGZlNjZhNjgtMjQzZC00MDI0LWFmNGQtNmNiYTIyYTE3ODhkXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_Ratio0.6716_AL_.jpg',
        crew: 'John Madden (dir.), Colin Firth, Matthew Macfadyen',
        imDbRating: '6.8',
        imDbRatingCount: '2752',
      },
      {
        id: 'tt13610562',
        rank: '83',
        rankUpDown: '-33',
        title: 'The Bubble',
        fullTitle: 'The Bubble (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BZWRiMDRkNmItYjkyNi00ZDFmLWFkMWEtNzYxYjk3NDI1YTFkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Judd Apatow (dir.), Harry Trevaldwyn, Samson Kayo',
        imDbRating: '4.7',
        imDbRatingCount: '20121',
      },
      {
        id: 'tt6264654',
        rank: '84',
        rankUpDown: '-10',
        title: 'Free Guy',
        fullTitle: 'Free Guy (2021)',
        year: '2021',
        image:
          'https://imdb-api.com/images/original/MV5BOTY2NzFjODctOWUzMC00MGZhLTlhNjMtM2Y2ODBiNGY1ZWRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Shawn Levy (dir.), Ryan Reynolds, Jodie Comer',
        imDbRating: '7.1',
        imDbRatingCount: '335671',
      },
      {
        id: 'tt8772262',
        rank: '85',
        rankUpDown: '+32',
        title: 'Midsommar',
        fullTitle: 'Midsommar (2019)',
        year: '2019',
        image:
          'https://imdb-api.com/images/original/MV5BMzQxNzQzOTQwM15BMl5BanBnXkFtZTgwMDQ2NTcwODM@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Ari Aster (dir.), Florence Pugh, Jack Reynor',
        imDbRating: '7.1',
        imDbRatingCount: '286390',
      },
      {
        id: 'tt2268016',
        rank: '86',
        rankUpDown: '+209',
        title: 'Magic Mike XXL',
        fullTitle: 'Magic Mike XXL (2015)',
        year: '2015',
        image:
          'https://imdb-api.com/images/original/MV5BNDMyODU3ODk3Ml5BMl5BanBnXkFtZTgwNDc1ODkwNjE@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Gregory Jacobs (dir.), Channing Tatum, Joe Manganiello',
        imDbRating: '5.6',
        imDbRatingCount: '55606',
      },
      {
        id: 'tt10323676',
        rank: '87',
        rankUpDown: '+15',
        title: 'The Contractor',
        fullTitle: 'The Contractor (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BOWQ3MDg1MTgtMmI4ZC00YjU3LWIyZGEtNmRkNzI0Y2QyN2ExXkEyXkFqcGdeQXVyNzgzODI1OTE@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Tarik Saleh (dir.), Chris Pine, Gillian Jacobs',
        imDbRating: '5.7',
        imDbRatingCount: '10274',
      },
      {
        id: 'tt0910936',
        rank: '88',
        rankUpDown: '+118',
        title: 'Pineapple Express',
        fullTitle: 'Pineapple Express (2008)',
        year: '2008',
        image:
          'https://imdb-api.com/images/original/MV5BMTY1MTE4NzAwM15BMl5BanBnXkFtZTcwNzg3Mjg2MQ@@._V1_Ratio0.6716_AL_.jpg',
        crew: 'David Gordon Green (dir.), Seth Rogen, James Franco',
        imDbRating: '6.9',
        imDbRatingCount: '334284',
      },
      {
        id: 'tt4263482',
        rank: '89',
        rankUpDown: '-36',
        title: 'The Witch',
        fullTitle: 'The Witch (2015)',
        year: '2015',
        image:
          'https://imdb-api.com/images/original/MV5BMTUyNzkwMzAxOF5BMl5BanBnXkFtZTgwMzc1OTk1NjE@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Robert Eggers (dir.), Anya Taylor-Joy, Ralph Ineson',
        imDbRating: '6.9',
        imDbRatingCount: '243747',
      },
      {
        id: 'tt3581652',
        rank: '90',
        rankUpDown: '-11',
        title: 'West Side Story',
        fullTitle: 'West Side Story (2021)',
        year: '2021',
        image:
          'https://imdb-api.com/images/original/MV5BMzQ5ZDZhZDItZTNmZi00MWQ0LWJlNDUtZTE4ZWJmODNlM2Y3XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Steven Spielberg (dir.), Ansel Elgort, Rachel Zegler',
        imDbRating: '7.2',
        imDbRatingCount: '70631',
      },
      {
        id: 'tt11286314',
        rank: '91',
        rankUpDown: '-15',
        title: "Don't Look Up",
        fullTitle: "Don't Look Up (2021)",
        year: '2021',
        image:
          'https://imdb-api.com/images/original/MV5BZjcwZjY3NjAtNzkxZS00NmFjLTg1OGYtODJmMThhY2UwMTc5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_Ratio0.7910_AL_.jpg',
        crew: 'Adam McKay (dir.), Leonardo DiCaprio, Jennifer Lawrence',
        imDbRating: '7.2',
        imDbRatingCount: '498663',
      },
      {
        id: 'tt0076759',
        rank: '92',
        rankUpDown: '+140',
        title: 'Star Wars',
        fullTitle: 'Star Wars (1977)',
        year: '1977',
        image:
          'https://imdb-api.com/images/original/MV5BNzg4MjQxNTQtZmI5My00YjMwLWJlMjUtMmJlY2U2ZWFlNzY1XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_Ratio0.6716_AL_.jpg',
        crew: 'George Lucas (dir.), Mark Hamill, Harrison Ford',
        imDbRating: '8.6',
        imDbRatingCount: '1321452',
      },
      {
        id: 'tt14479746',
        rank: '93',
        rankUpDown: '7,141',
        title: 'Thar',
        fullTitle: 'Thar (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BOWY1NjE2MzUtYTVjOC00ZDUxLWIwZDUtMzk5YWQ5ODc5YTI5XkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_Ratio1.0000_AL_.jpg',
        crew: 'Raj Singh Chaudhary (dir.), Nivedita Bhattacharya, Sanjay Bishnoi',
        imDbRating: '6.2',
        imDbRatingCount: '2191',
      },
      {
        id: 'tt2322441',
        rank: '94',
        rankUpDown: '+19',
        title: 'Fifty Shades of Grey',
        fullTitle: 'Fifty Shades of Grey (2015)',
        year: '2015',
        image:
          'https://imdb-api.com/images/original/MV5BMjE1MTM4NDAzOF5BMl5BanBnXkFtZTgwNTMwNjI0MzE@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Sam Taylor-Johnson (dir.), Dakota Johnson, Jamie Dornan',
        imDbRating: '4.1',
        imDbRatingCount: '315048',
      },
      {
        id: 'tt1649418',
        rank: '95',
        rankUpDown: '-66',
        title: 'The Gray Man',
        fullTitle: 'The Gray Man (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BYTVjZDBhYjQtZWNmZS00ZDk4LTgzZmMtNTBjMjRhYTcxOTg5XkEyXkFqcGdeQXVyNjQ5MTU1ODc@._V1_Ratio2.3731_AL_.jpg',
        crew: 'Anthony Russo (dir.), Ana de Armas, Chris Evans',
        imDbRating: '',
        imDbRatingCount: '0',
      },
      {
        id: 'tt15398776',
        rank: '96',
        rankUpDown: '-30',
        title: 'Oppenheimer',
        fullTitle: 'Oppenheimer (2023)',
        year: '2023',
        image:
          'https://imdb-api.com/images/original/MV5BMGM4MDViMGQtYjFmMi00NDhiLThhN2MtYTQxMmU4ZGM3NDAwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio1.7761_AL_.jpg',
        crew: 'Christopher Nolan (dir.), Florence Pugh, Cillian Murphy',
        imDbRating: '',
        imDbRatingCount: '0',
      },
      {
        id: 'tt1156398',
        rank: '97',
        rankUpDown: '+14',
        title: 'Zombieland',
        fullTitle: 'Zombieland (2009)',
        year: '2009',
        image:
          'https://imdb-api.com/images/original/MV5BMTU5MDg0NTQ1N15BMl5BanBnXkFtZTcwMjA4Mjg3Mg@@._V1_Ratio0.7015_AL_.jpg',
        crew: 'Ruben Fleischer (dir.), Jesse Eisenberg, Emma Stone',
        imDbRating: '7.6',
        imDbRatingCount: '560700',
      },
      {
        id: 'tt13841850',
        rank: '98',
        rankUpDown: '+56',
        title: 'Men',
        fullTitle: 'Men (2022)',
        year: '2022',
        image:
          'https://imdb-api.com/images/original/MV5BZGQ2ZDNiMjgtMTNhNS00MjUxLWFkYTMtYTI1OTE0MmQ2MmJkXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_Ratio0.6716_AL_.jpg',
        crew: 'Alex Garland (dir.), Paapa Essiedu, Gayle Rankin',
        imDbRating: '',
        imDbRatingCount: '0',
      },
      {
        id: 'tt7131622',
        rank: '99',
        rankUpDown: '+8',
        title: 'Once Upon a Time... In Hollywood',
        fullTitle: 'Once Upon a Time... In Hollywood (2019)',
        year: '2019',
        image:
          'https://imdb-api.com/images/original/MV5BOTg4ZTNkZmUtMzNlZi00YmFjLTk1MmUtNWQwNTM0YjcyNTNkXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_Ratio0.6716_AL_.jpg',
        crew: 'Quentin Tarantino (dir.), Leonardo DiCaprio, Brad Pitt',
        imDbRating: '7.6',
        imDbRatingCount: '687271',
      },
      {
        id: 'tt3402236',
        rank: '100',
        rankUpDown: '-14',
        title: 'Murder on the Orient Express',
        fullTitle: 'Murder on the Orient Express (2017)',
        year: '2017',
        image:
          'https://imdb-api.com/images/original/MV5BMTAxNDkxODIyMDZeQTJeQWpwZ15BbWU4MDQ2Mjg4NDIy._V1_Ratio0.6716_AL_.jpg',
        crew: 'Kenneth Branagh (dir.), Kenneth Branagh, Penélope Cruz',
        imDbRating: '6.5',
        imDbRatingCount: '247463',
      },
    ],
    errorMessage: '',
  };
  movies: any = this.rawMovieData.items.slice(0, this.itemsOnDisplay);

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
    // window.scrollTo({ top: 400, behavior: 'smooth' });
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
    // let basePage = this.pageCounter - 1;
    this.formerItemsOnDisplay = Number(this.formerItemsOnDisplay);
    this.itemsOnDisplay = Number(this.itemsOnDisplay);
    let basePage =
      this.pageCounter * this.formerItemsOnDisplay - this.formerItemsOnDisplay;

    // if (basePage === 0) {
    //   basePage = 1;
    // }

    this.movies = this.rawMovieData.items.slice(
      // basePage * this.formerItemsOnDisplay,
      // basePage * this.formerItemsOnDisplay + this.itemsOnDisplay
      basePage,
      basePage + this.itemsOnDisplay
    );

    this.formerItemsOnDisplay = this.itemsOnDisplay;
  }
}
