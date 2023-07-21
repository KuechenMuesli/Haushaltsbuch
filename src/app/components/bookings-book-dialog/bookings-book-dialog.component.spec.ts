import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsBookDialogComponent } from './bookings-book-dialog.component';

describe('BookingsBookDialogComponent', () => {
  let component: BookingsBookDialogComponent;
  let fixture: ComponentFixture<BookingsBookDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingsBookDialogComponent]
    });
    fixture = TestBed.createComponent(BookingsBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
