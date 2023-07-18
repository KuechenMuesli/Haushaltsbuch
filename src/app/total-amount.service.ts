import { Injectable } from '@angular/core';
import { BOOKINGS } from './bookings-list';
import { BookingsTableComponent } from './bookings-table/bookings-table.component';
import { Booking } from './booking';

@Injectable({
  providedIn: 'root'
})
export class TotalAmountService {
  bookings: Booking[] = BOOKINGS;
  total_amount: number = 0;

  updateBookings(): void {
    this.bookings = BOOKINGS;
  }

  calculate_total(): void {
    this.total_amount = 0;
    for (let i = this.bookings.length - 1; i >= 0; i--){
      this.total_amount += this.bookings[i].amount;
    }
  }
  

  constructor() { }
}
