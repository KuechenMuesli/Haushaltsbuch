import { Injectable } from '@angular/core';
import { Booking } from '../../booking';
import { BookingsListService } from '../bookings-list-service/bookings-list.service';

@Injectable({
  providedIn: 'root'
})
export class TotalAmountService {
  bookings: Booking[] = this.bookingsListService.getBookings(this.bookingsListService.bookingsListId);
  total_amount: number = 0;

  constructor(private bookingsListService: BookingsListService) { }

  updateBookings(): void {
    this.bookings = this.bookingsListService.getBookings(this.bookingsListService.bookingsListId);
  }

  calculate_total(): void {
    this.bookings = this.bookingsListService.getBookings(this.bookingsListService.bookingsListId);
    this.bookings 
    this.total_amount = 0;
    for (let i = this.bookings.length - 1; i >= 0; i--){
      this.total_amount += +this.bookings[i].amount;
    }
  }
}
