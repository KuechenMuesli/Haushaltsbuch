import { TestBed } from '@angular/core/testing';

import { BookingsTableService } from './bookings-table.service';

describe('BookingsTableService', () => {
  let service: BookingsTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingsTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
