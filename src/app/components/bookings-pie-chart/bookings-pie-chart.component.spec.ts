import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsPieChartComponent } from './bookings-pie-chart.component';

describe('BookingsPieChartComponent', () => {
  let component: BookingsPieChartComponent;
  let fixture: ComponentFixture<BookingsPieChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingsPieChartComponent]
    });
    fixture = TestBed.createComponent(BookingsPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
