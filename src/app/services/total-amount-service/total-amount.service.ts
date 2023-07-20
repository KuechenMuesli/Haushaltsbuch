import { Injectable } from '@angular/core';
import { BOOKINGS } from '../../bookings-list';
import { Booking } from '../../booking';
import { BookingsListService } from '../bookings-list-service/bookings-list.service';

@Injectable({
  providedIn: 'root'
})
export class TotalAmountService {
  bookingsListIndex: number = this.bookingsListService.bookingsListIndex;
  bookings: Booking[] = BOOKINGS[this.bookingsListIndex];
  total_amount: number = 0;

  updateBookings(): void {
    this.bookings = BOOKINGS[this.bookingsListIndex];
  }

  calculate_total(): void {
    this.total_amount = 0;
    for (let i = this.bookings.length - 1; i >= 0; i--){
      this.total_amount += +this.bookings[i].amount;
    }
  }
  

  constructor(private bookingsListService: BookingsListService) { }
}
