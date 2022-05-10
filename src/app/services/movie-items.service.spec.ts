import { TestBed } from '@angular/core/testing';

import { MovieItemsService } from './movie-items.service';

describe('MovieItemsService', () => {
  let service: MovieItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
