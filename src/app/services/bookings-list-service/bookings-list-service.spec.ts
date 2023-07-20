import { TestBed } from '@angular/core/testing';

import { BookingsListService } from './bookings-list.service';

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
