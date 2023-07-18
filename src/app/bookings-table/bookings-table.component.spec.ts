import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsTableComponent } from './bookings-table.component';

describe('BookingsTableComponent', () => {
  let component: BookingsTableComponent;
  let fixture: ComponentFixture<BookingsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingsTableComponent]
    });
    fixture = TestBed.createComponent(BookingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
