import { TestBed } from '@angular/core/testing';

import { BookingsDialogService } from './bookings-dialog.service';

describe('BookingsDialogService', () => {
  let service: BookingsDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingsDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
