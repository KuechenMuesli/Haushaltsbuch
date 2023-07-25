import { TestBed } from '@angular/core/testing';

import { BookingsListService } from './books.service';

describe('BookingsListService', () => {
  let service: BookingsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
