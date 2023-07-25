import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsTableDialogComponent } from './bookings-table-dialog.component';

describe('AddEditBookingDialogComponent', () => {
  let component: BookingsTableDialogComponent;
  let fixture: ComponentFixture<BookingsTableDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingsTableDialogComponent]
    });
    fixture = TestBed.createComponent(BookingsTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
